// app/recommend/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { recommendAssignee, Recommendation, Agent, Ticket } from '@/lib/recommender';

const mockAgents: Agent[] = [
  { id: '1', name: '张伟', skills: ['frontend', 'backend', 'payment'], capacity: 8, currentLoad: 3, performance: 92 },
  { id: '2', name: '李娜', skills: ['customer_service', 'refund', 'complaint'], capacity: 10, currentLoad: 5, performance: 88 },
  { id: '3', name: '王强', skills: ['backend', 'database', 'devops'], capacity: 6, currentLoad: 2, performance: 95 },
  { id: '4', name: '刘芳', skills: ['product', 'ux', 'feedback'], capacity: 12, currentLoad: 4, performance: 85 },
];

export default function RecommendPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('TECH_SUPPORT');
  const [priority, setPriority] = useState('MEDIUM');
  const [results, setResults] = useState<Recommendation[]>([]);

  const handleRecommend = () => {
    const ticket: Ticket = {
      id: 'demo', title, category, priority,
      requiredSkills: category === 'TECH_SUPPORT' ? ['backend'] : category === 'COMPLAINT' ? ['customer_service'] : category === 'PRODUCT_FEEDBACK' ? ['product'] : [],
    };
    setResults(recommendAssignee(ticket, mockAgents));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">🎯 智能推荐演示</h1>
        <p className="text-slate-500">输入工单信息，系统将推荐最优处理人</p>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">工单标题</label>
              <Input placeholder="例如：支付接口报错" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">分类</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TECH_SUPPORT">技术支持</SelectItem>
                    <SelectItem value="COMPLAINT">投诉</SelectItem>
                    <SelectItem value="PRODUCT_FEEDBACK">产品反馈</SelectItem>
                    <SelectItem value="INQUIRY">咨询</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">优先级</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URGENT">紧急</SelectItem>
                    <SelectItem value="HIGH">高</SelectItem>
                    <SelectItem value="MEDIUM">中</SelectItem>
                    <SelectItem value="LOW">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleRecommend} className="bg-indigo-600 hover:bg-indigo-700">获取推荐</Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">推荐结果（按匹配度排序）</h2>
            {results.map((rec, idx) => (
              <Card key={rec.agent.id} className={idx === 0 ? 'border-2 border-indigo-300 bg-indigo-50/50' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">{rec.agent.name[0]}</div>
                      <div>
                        <div className="font-semibold">{rec.agent.name}</div>
                        <div className="text-sm text-slate-500">负载 {rec.agent.currentLoad}/{rec.agent.capacity} · 绩效 {rec.agent.performance}分</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">{rec.score}</div>
                      <div className="text-xs text-slate-500">匹配度</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rec.reasons.map(r => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}
                    <Badge variant="outline" className="text-xs">预估 {rec.estimatedHandleTime} 分钟</Badge>
                  </div>
                  {idx === 0 && <div className="mt-3 text-sm text-indigo-700 font-medium">⭐ 首选推荐</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
