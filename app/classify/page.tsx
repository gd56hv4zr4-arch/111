// app/classify/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { classifyTicket, ClassificationResult } from '@/lib/classifier';

export default function ClassifyPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleClassify = () => {
    if (!title.trim()) return;
    setResult(classifyTicket(title, description));
  };

  const categoryColors: Record<string, string> = {
    TECH_SUPPORT: 'bg-blue-100 text-blue-800',
    PRODUCT_FEEDBACK: 'bg-violet-100 text-violet-800',
    COMPLAINT: 'bg-red-100 text-red-800',
    INQUIRY: 'bg-emerald-100 text-emerald-800',
    UNCATEGORIZED: 'bg-slate-100 text-slate-800',
  };

  const categoryLabels: Record<string, string> = {
    TECH_SUPPORT: '🔧 技术支持',
    PRODUCT_FEEDBACK: '💡 产品反馈',
    COMPLAINT: '⚠️ 投诉',
    INQUIRY: '❓ 咨询',
    UNCATEGORIZED: '📄 未分类',
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">🧠 智能分类演示</h1>
        <p className="text-slate-500">输入工单标题和描述，AI 将自动识别分类和置信度</p>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">工单标题</label>
              <Input placeholder="例如：登录页面崩溃无法进入系统" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">详细描述</label>
              <Textarea placeholder="请描述具体问题..." rows={4} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <Button onClick={handleClassify} className="bg-indigo-600 hover:bg-indigo-700">开始分类</Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-2 border-indigo-200">
            <CardHeader><CardTitle>分类结果</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">识别分类：</span>
                <Badge className={categoryColors[result.category] || ''}>{categoryLabels[result.category] || result.category}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">置信度：</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${result.confidence * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                </div>
              </div>
              {result.matchedKeywords.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-slate-500">匹配关键词：</span>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map(kw => <Badge key={kw} variant="outline">{kw}</Badge>)}
                  </div>
                </div>
              )}
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600">💬 {result.reason}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
