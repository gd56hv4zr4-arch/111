// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Ticket, Users, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">🎫 智能工单系统</h1>
            <p className="text-slate-500 mt-1">数据处理 · 智能分类 · 质量评测 · 智能推荐</p>
          </div>
          <Link href="/tickets/new" className={buttonVariants({ className: 'bg-indigo-600 hover:bg-indigo-700' })}>
            + 新建工单
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">待处理工单</CardTitle>
              <Ticket className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <Badge variant="secondary" className="mt-1">+2 今日新增</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">在线处理人</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <Badge variant="secondary" className="mt-1">平均负载 62%</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">今日解决率</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <Badge variant="secondary" className="mt-1">高于目标 7%</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">即将超时</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <Badge variant="destructive" className="mt-1">需立即关注</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tickets">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">📋 工单管理</h3>
                <p className="text-sm text-slate-500 mt-1">查看、筛选、处理所有工单</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/classify">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-violet-500">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">🧠 智能分类</h3>
                <p className="text-sm text-slate-500 mt-1">自动识别工单类型与优先级</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">📊 数据看板</h3>
                <p className="text-sm text-slate-500 mt-1">趋势分析、绩效评测、洞察</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
