import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white">
            🎫
          </div>
          <h1 className="text-2xl font-bold text-slate-900">登录 Ticket Intelligence</h1>
          <p className="mt-2 text-sm text-slate-500">使用 GitHub 账号登录后查看工单与数据看板</p>
        </div>
        <Link
          href="/api/auth/signin/github"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          继续使用 GitHub 登录
        </Link>
      </div>
    </div>
  );
}
