import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';
import { TicketsFilterBar } from '@/components/tickets-filter-bar';

const priorityStyles: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700 hover:bg-red-100',
  high: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
  medium: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  low: 'bg-slate-100 text-slate-600 hover:bg-slate-100',
};

const priorityLabels: Record<string, string> = {
  urgent: '紧急',
  high: '高',
  medium: '中',
  low: '低',
};

const statusLabels: Record<string, string> = {
  open: '待处理',
  in_progress: '处理中',
  resolved: '已解决',
  closed: '已关闭',
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    category?: string;
    status?: string;
    priority?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};
  const category = params.category;
  const status = params.status;
  const priority = params.priority;

  const [tickets, categories] = await Promise.all([
    prisma.ticket.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(status ? { status } : {}),
        ...(priority ? { priority } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        assignee: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.ticket.findMany({
      distinct: ['category'],
      select: {
        category: true,
      },
      orderBy: {
        category: 'asc',
      },
    }),
  ]);

  const categoryOptions = categories.map((item) => item.category);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">工单管理</h1>
          <p className="mt-1 text-sm text-slate-500">查看和筛选所有工单记录</p>
        </div>

        <Card className="border-slate-200/70 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="h-4 w-4 text-slate-500" />
              筛选条件
            </CardTitle>
            <CardDescription>按分类、状态和优先级快速定位目标工单</CardDescription>
          </CardHeader>
          <CardContent>
            <TicketsFilterBar categories={categoryOptions} />
          </CardContent>
        </Card>

        <Card className="border-slate-200/70 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle>工单列表</CardTitle>
            <CardDescription>共 {tickets.length} 条记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>标题</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>优先级</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>处理人</TableHead>
                  <TableHead>创建时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="max-w-[320px] truncate font-medium text-slate-900">
                      {ticket.title}
                    </TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn('border-transparent capitalize', priorityStyles[ticket.priority] ?? priorityStyles.low)}
                      >
                        {priorityLabels[ticket.priority] ?? ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-200 text-slate-600">
                        {statusLabels[ticket.status] ?? ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.assignee?.name ?? '未分配'}</TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
