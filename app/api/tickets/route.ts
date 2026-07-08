import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma, getPrismaErrorMessage } from '@/lib/prisma';

function isPrismaConnectionError(error: unknown) {
  return error instanceof Prisma.PrismaClientInitializationError;
}

function isPrismaTableMissingError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const priority = searchParams.get('priority') || undefined;

    const tickets = await prisma.ticket.findMany({
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
    });

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Failed to fetch tickets', error);

    if (isPrismaConnectionError(error) || isPrismaTableMissingError(error)) {
      return NextResponse.json(
        {
          tickets: [],
          warning:
            error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021'
              ? '数据库表结构尚未初始化，已返回空列表。'
              : getPrismaErrorMessage(error, '数据库暂时不可用，已返回空列表。'),
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}
