// lib/classifier.ts
// 智能工单分类引擎 —— 基于规则 + 关键词权重

export type TicketCategory = 
  | 'TECH_SUPPORT' 
  | 'PRODUCT_FEEDBACK' 
  | 'COMPLAINT' 
  | 'INQUIRY' 
  | 'UNCATEGORIZED';

export interface ClassificationResult {
  category: TicketCategory;
  confidence: number; // 0-1
  matchedKeywords: string[];
  reason: string;
}

interface ClassificationRule {
  category: TicketCategory;
  keywords: string[];
  weight: number;
  patterns?: RegExp[];
}

const RULES: ClassificationRule[] = [
  {
    category: 'TECH_SUPPORT',
    keywords: ['bug', '崩溃', '报错', '无法', 'error', '失败', '闪退', '卡顿', '连不上', '登录不了', '白屏', '500', '404'],
    weight: 1.0,
    patterns: [/error\s*\w*/i, /bug\s*#?\d*/i, /\b500\b/, /\b404\b/],
  },
  {
    category: 'PRODUCT_FEEDBACK',
    keywords: ['建议', '希望', '能否', '功能', '优化', '改进', '体验', '界面', '交互', '增加', '缺少', '想要'],
    weight: 0.8,
  },
  {
    category: 'COMPLAINT',
    keywords: ['投诉', '不满', '差评', '退款', '赔偿', '欺诈', '虚假宣传', '态度差', '迟迟不', '一直不', '欺骗'],
    weight: 1.2,
    patterns: [/退.*款/i, /赔.*偿/i, /欺.*骗/i],
  },
  {
    category: 'INQUIRY',
    keywords: ['请问', '咨询', '怎么', '如何', '价格', '费用', '多久', '什么时候', '在哪里', '怎么办', '吗？'],
    weight: 0.6,
    patterns: [/^(请问|咨询|想问问)/i, /\?$/],
  },
];

export function classifyTicket(title: string, description: string): ClassificationResult {
  const text = `${title} ${description}`.toLowerCase();
  const scores: Record<string, number> = {};
  const matchedKeywords: string[] = [];

  for (const rule of RULES) {
    let score = 0;
    const matches: string[] = [];

    for (const kw of rule.keywords) {
      if (text.includes(kw.toLowerCase())) {
        score += rule.weight;
        matches.push(kw);
      }
    }

    if (rule.patterns) {
      for (const pattern of rule.patterns) {
        if (pattern.test(text)) {
          score += rule.weight * 1.5;
        }
      }
    }

    if (score > 0) {
      scores[rule.category] = (scores[rule.category] || 0) + score;
      matchedKeywords.push(...matches);
    }
  }

  if (Object.keys(scores).length === 0) {
    return {
      category: 'UNCATEGORIZED',
      confidence: 0,
      matchedKeywords: [],
      reason: '未匹配到任何分类规则，建议人工审核',
    };
  }

  const entries = Object.entries(scores);
  entries.sort((a, b) => b[1] - a[1]);
  const [topCategory, topScore] = entries[0];
  const totalScore = entries.reduce((sum, [, s]) => sum + s, 0);
  const confidence = entries.length === 1 ? 0.95 : topScore / totalScore;

  return {
    category: topCategory as TicketCategory,
    confidence: Math.min(confidence, 0.99),
    matchedKeywords: [...new Set(matchedKeywords)],
    reason: `匹配到关键词: ${[...new Set(matchedKeywords)].join(', ')}`,
  };
}

export function batchClassify(tickets: { id: string; title: string; description: string }[]) {
  return tickets.map(t => ({
    ...t,
    ...classifyTicket(t.title, t.description),
  }));
}
