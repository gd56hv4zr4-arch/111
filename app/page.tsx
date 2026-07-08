// app/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Ticket, Users, TrendingUp, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const quickStats = [
  { label: '待处理工单', value: '12', hint: '+2 今日新增', icon: Ticket, tone: 'text-indigo-600', badge: 'secondary' as const },
  { label: '在线处理人', value: '4', hint: '平均负载 62%', icon: Users, tone: 'text-emerald-600', badge: 'secondary' as const },
  { label: '今日解决率', value: '87%', hint: '高于目标 7%', icon: TrendingUp, tone: 'text-emerald-600', badge: 'secondary' as const },
  { label: '即将超时', value: '3', hint: '需立即关注', icon: AlertCircle, tone: 'text-amber-600', badge: 'destructive' as const },
];

const modules = [
  { href: '/tickets', title: '工单管理', description: '查看、筛选、处理所有工单', accent: 'border-l-indigo-500', icon: Ticket },
  { href: '/classify', title: '智能分类', description: '自动识别工单类型与优先级', accent: 'border-l-violet-500', icon: Sparkles },
  { href: '/dashboard', title: '数据看板', description: '趋势分析、绩效评测、洞察', accent: 'border-l-emerald-500', icon: ShieldCheck },
];

function EmptyStateCard() {
  return (
    <Card className="border-dashed border-slate-200 bg-white/80 shadow-sm">
      <CardContent className="flex min-h-[240px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
          ✨
        </div>
        <h3 className="text-lg font-semibold text-slate-900">还没有开始处理工单</h3>
        <p className="mt-2 max-w-md text-sm text-slate-500">先创建第一条工单，或者体验智能分类和数据看板，快速了解系统能力。</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/tickets/new" className={buttonVariants({ className: 'bg-indigo-600 hover:bg-indigo-700' })}>
            创建工单
          </Link>
          <Link href="/classify" className={buttonVariants({ variant: 'outline' })}>
            体验分类
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Ticket Intelligence</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">智能工单系统</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">数据处理 · 智能分类 · 质量评测 · 智能推荐</p>
          </div>
          <Link href="/tickets/new" className={buttonVariants({ className: 'bg-indigo-600 hover:bg-indigo-700' })}>
            + 新建工单
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {quickStats.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="border-slate-200/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{item.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${item.tone}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                  <Badge variant={item.badge} className="mt-1">
                    {item.hint}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <EmptyStateCard />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.href} href={module.href}>
                <Card className={`cursor-pointer border-l-4 ${module.accent} transition-shadow hover:shadow-lg`}>
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
