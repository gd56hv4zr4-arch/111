import { Prisma, PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export function isPrismaInitializationError(error: unknown) {
  return error instanceof Prisma.PrismaClientInitializationError;
}

export function getPrismaErrorMessage(error: unknown, fallback: string) {
  if (isPrismaInitializationError(error)) {
    return '数据库连接不可用，请稍后重试或检查环境变量配置。';
  }

  return fallback;
}
