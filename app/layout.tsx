// app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Ticket Intelligence - 智能工单系统',
  description: '数据处理 · 智能分类 · 质量评测 · 智能推荐',
};

const navItems = [
  { href: '/', label: '首页' },
  { href: '/tickets', label: '工单管理' },
  { href: '/classify', label: '智能分类' },
  { href: '/dashboard', label: '数据看板' },
  { href: '/recommend', label: '智能推荐' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-slate-50 text-slate-900">
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-900">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-base text-white shadow-sm shadow-indigo-600/20">
                  🎫
                </span>
                <span>Ticket Intelligence</span>
              </Link>

              <nav className="hidden flex-1 items-center justify-center gap-1 md:flex" aria-label="主导航">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'h-9 px-3 text-sm font-medium text-slate-600 hover:text-slate-900'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="ml-auto flex items-center gap-3">
                <Card className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600 shadow-none">
                  U
                </Card>
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
