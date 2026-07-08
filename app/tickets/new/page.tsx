import { Prisma } from '@prisma/client';
import { prisma, getPrismaErrorMessage } from '@/lib/prisma';
import { classifyTicket, type ClassificationResult } from '@/lib/classifier';
import { NewTicketForm, type NewTicketActionState } from '@/components/new-ticket-form';
import { redirect } from 'next/navigation';

function isPrismaConnectionError(error: unknown) {
  return error instanceof Prisma.PrismaClientInitializationError;
}

async function createTicketAction(
  _state: NewTicketActionState,
  formData: FormData
): Promise<NewTicketActionState> {
  'use server';

  try {
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const priority = String(formData.get('priority') ?? 'medium');

    if (!title || !description) {
      return { error: '请填写标题和描述。' };
    }

    const suggestion: ClassificationResult = classifyTicket(title, description);

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority,
        category: suggestion.category,
        status: 'open',
        slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      select: { id: true },
    });

    redirect('/tickets');
  } catch (error) {
    console.error('Failed to create ticket', error);

    if (isPrismaConnectionError(error)) {
      return { error: getPrismaErrorMessage(error, '数据库连接失败，暂时无法创建工单。') };
    }

    return { error: '创建工单失败，请稍后重试。' };
  }
}

export default function NewTicketPage() {
  const initialState: NewTicketActionState = {};

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">新建工单</h1>
        <p className="mb-6 text-sm text-slate-500">提交后系统会自动调用分类引擎并保存到数据库</p>
        <NewTicketForm action={createTicketAction} initialState={initialState} />
      </div>
    </div>
  );
}
