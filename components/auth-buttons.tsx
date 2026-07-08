'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn('github')}
        className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        GitHub 登录
      </button>
    );
  }

  const name = session.user?.name ?? 'User';
  const fallback = name.slice(0, 1).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
          {fallback}
        </div>
        <span className="max-w-24 truncate text-sm font-medium text-slate-700">{name}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
      >
        登出
      </button>
    </div>
  );
}
