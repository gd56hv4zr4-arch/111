// lib/recommender.ts
// 智能工单分配推荐引擎 —— 负载均衡 + 技能匹配

export interface Agent {
  id: string;
  name: string;
  skills: string[];
  capacity: number;
  currentLoad: number;
  performance: number;
}

export interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: string;
  requiredSkills?: string[];
}

export interface Recommendation {
  agent: Agent;
  score: number;
  reasons: string[];
  estimatedHandleTime: number;
}

function skillMatch(ticket: Ticket, agent: Agent): number {
  if (!ticket.requiredSkills || ticket.requiredSkills.length === 0) return 0.5;
  const matched = ticket.requiredSkills.filter(skill => 
    agent.skills.some(s => s.toLowerCase() === skill.toLowerCase())
  );
  return matched.length / ticket.requiredSkills.length;
}

function availabilityScore(agent: Agent): number {
  const ratio = agent.currentLoad / agent.capacity;
  if (ratio >= 1) return 0;
  return 1 - ratio;
}

function priorityWeight(priority: string): number {
  const weights: Record<string, number> = { URGENT: 2.0, HIGH: 1.5, MEDIUM: 1.0, LOW: 0.7 };
  return weights[priority.toUpperCase()] || 1.0;
}

export function recommendAssignee(ticket: Ticket, agents: Agent[]): Recommendation[] {
  const scored = agents.map(agent => {
    const skill = skillMatch(ticket, agent);
    const avail = availabilityScore(agent);
    const perf = agent.performance / 100;
    const priority = priorityWeight(ticket.priority);
    const overloadPenalty = avail === 0 ? 0.1 : 1;
    const score = (skill * 0.4 + avail * 0.35 + perf * 0.25) * priority * overloadPenalty;

    const reasons: string[] = [];
    if (skill > 0.7) reasons.push(`技能高度匹配 (${Math.round(skill * 100)}%)`);
    else if (skill > 0.3) reasons.push(`部分技能匹配`);
    if (avail > 0.7) reasons.push('当前负载较轻');
    else if (avail > 0.3) reasons.push('有处理能力余量');
    else if (avail === 0) reasons.push('⚠️ 当前已满负荷');
    if (perf > 0.8) reasons.push('历史绩效优秀');

    const baseTime = 30;
    const estimatedHandleTime = baseTime / (avail + 0.1) / priority;

    return { agent, score: Math.round(score * 100) / 100, reasons, estimatedHandleTime: Math.round(estimatedHandleTime) };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export function batchRecommend(tickets: Ticket[], agents: Agent[]) {
  return tickets.map(ticket => ({
    ticketId: ticket.id,
    recommendations: recommendAssignee(ticket, agents).slice(0, 3),
  }));
}
