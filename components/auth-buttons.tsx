'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />;
  }

  if (!session) {
    return (
      <Button onClick={() => signIn('github')} className="bg-indigo-600 hover:bg-indigo-700">
        GitHub 登录
      </Button>
    );
  }

  const name = session.user?.name ?? 'User';
  const fallback = name.slice(0, 1).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <Link href="/tickets" className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 md:inline-flex">
        工单管理
      </Link>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
          {fallback}
        </div>
        <span className="max-w-24 truncate text-sm font-medium text-slate-700">{name}</span>
      </div>
      <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
        登出
      </Button>
    </div>
  );
}
