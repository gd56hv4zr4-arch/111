"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const statusLabels: Record<string, string> = {
  open: '待处理',
  in_progress: '处理中',
  resolved: '已解决',
  closed: '已关闭',
};

const priorityLabels: Record<string, string> = {
  urgent: '紧急',
  high: '高',
  medium: '中',
  low: '低',
};

export function TicketsFilterBar({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all' || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters =
    searchParams.has('category') || searchParams.has('status') || searchParams.has('priority');

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Select value={searchParams.get('category') ?? 'all'} onValueChange={(value) => updateParams('category', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="按分类筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={searchParams.get('status') ?? 'all'} onValueChange={(value) => updateParams('status', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="按状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={searchParams.get('priority') ?? 'all'} onValueChange={(value) => updateParams('priority', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="按优先级筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部优先级</SelectItem>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={clearFilters}
          disabled={!hasFilters}
          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          清空筛选
        </Button>
      </div>
    </div>
  );
}
