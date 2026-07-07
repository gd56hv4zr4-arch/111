"use client";

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TicketCategory } from '@/lib/classifier';
import { cn } from '@/lib/utils';

export type NewTicketActionState = {
  message?: string;
  error?: string;
  suggestion?: {
    category: TicketCategory;
    confidence: number;
    matchedKeywords: string[];
    reason: string;
  };
  createdTicketId?: string;
};

const categoryLabels: Record<TicketCategory, string> = {
  TECH_SUPPORT: '🔧 技术支持',
  PRODUCT_FEEDBACK: '💡 产品反馈',
  COMPLAINT: '⚠️ 投诉',
  INQUIRY: '❓ 咨询',
  UNCATEGORIZED: '📄 未分类',
};

const categoryColors: Record<TicketCategory, string> = {
  TECH_SUPPORT: 'bg-blue-100 text-blue-800',
  PRODUCT_FEEDBACK: 'bg-violet-100 text-violet-800',
  COMPLAINT: 'bg-red-100 text-red-800',
  INQUIRY: 'bg-emerald-100 text-emerald-800',
  UNCATEGORIZED: 'bg-slate-100 text-slate-800',
};

const priorityLabels = {
  urgent: '紧急',
  high: '高',
  medium: '中',
  low: '低',
} as const;

export function NewTicketForm({
  action,
  initialState,
}: {
  action: (state: NewTicketActionState, formData: FormData) => Promise<NewTicketActionState>;
  initialState: NewTicketActionState;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/70 shadow-sm">
        <CardHeader>
          <CardTitle>新建工单</CardTitle>
          <CardDescription>填写工单信息后，系统会自动给出分类建议并保存到数据库</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-700">标题</label>
              <Input id="title" name="title" placeholder="例如：登录页面崩溃无法进入系统" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-slate-700">描述</label>
              <Textarea id="description" name="description" placeholder="请详细描述问题、现象、影响范围等" rows={6} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium text-slate-700">优先级</label>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={pending}>
              {pending ? '提交中...' : '提交工单'}
            </Button>
          </form>

          {state.error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          {state.message && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {state.message}
            </div>
          )}
        </CardContent>
      </Card>

      {state.suggestion && (
        <Card className="border-indigo-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>分类建议</CardTitle>
            <CardDescription>系统根据标题和描述自动分析得出</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-500">建议分类：</span>
              <Badge className={cn('border-transparent', categoryColors[state.suggestion.category])}>
                {categoryLabels[state.suggestion.category]}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">置信度：</span>
              <span className="text-sm font-medium text-slate-900">{Math.round(state.suggestion.confidence * 100)}%</span>
            </div>
            {state.suggestion.matchedKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {state.suggestion.matchedKeywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="border-slate-200 text-slate-600">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">{state.suggestion.reason}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
