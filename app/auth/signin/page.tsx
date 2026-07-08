import Link from 'next/link';

const benefits = [
  'GitHub 单点登录，快速进入系统',
  '工单管理、看板访问保护',
  '自动分类与推荐能力随时可用',
];

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-6 lg:grid-cols-2 lg:items-center">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-xl shadow-indigo-900/10">
          <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
            Ticket Intelligence
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight">连接工单、自动分类、快速响应</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100">
            使用 GitHub 账号登录，安全访问工单管理、数据看板和智能推荐能力。
          </p>
          <div className="mt-8 space-y-3">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/95">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl text-white shadow-sm">
              🎫
            </div>
            <h2 className="text-2xl font-bold text-slate-900">登录 Ticket Intelligence</h2>
            <p className="mt-2 text-sm text-slate-500">继续使用 GitHub 账号登录</p>

            <Link
              href="/api/auth/signin/github"
              className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              使用 GitHub 登录
            </Link>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              登录即表示你同意系统记录必要的会话信息用于访问控制。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
