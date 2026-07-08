// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.agent.deleteMany();

  const agents = await prisma.$transaction([
    prisma.agent.create({ data: { name: '张伟', email: 'zhangwei@company.com', skills: JSON.stringify(['frontend', 'backend', 'payment']), capacity: 8, currentLoad: 3, performance: 92 } }),
    prisma.agent.create({ data: { name: '李娜', email: 'lina@company.com', skills: JSON.stringify(['customer_service', 'refund', 'complaint']), capacity: 10, currentLoad: 5, performance: 88 } }),
    prisma.agent.create({ data: { name: '王强', email: 'wangqiang@company.com', skills: JSON.stringify(['backend', 'database', 'devops']), capacity: 6, currentLoad: 2, performance: 95 } }),
    prisma.agent.create({ data: { name: '刘芳', email: 'liufang@company.com', skills: JSON.stringify(['product', 'ux', 'feedback']), capacity: 12, currentLoad: 4, performance: 85 } }),
  ]);

  const now = new Date();
  const slaMap: Record<string, number> = { URGENT: 60, HIGH: 240, MEDIUM: 1440, LOW: 4320 };

  const tickets = [
    { title: '登录页面崩溃，无法进入系统', description: '用户在点击登录按钮后页面直接白屏，控制台显示 error: cannot read property of undefined。', category: 'TECH_SUPPORT', priority: 'URGENT', status: 'open', assigneeId: agents[0].id, slaDeadline: new Date(now.getTime() + slaMap.URGENT * 60000) },
    { title: '建议增加深色模式功能', description: '很多用户反馈晚上使用系统时眼睛疲劳，希望能增加深色模式。', category: 'PRODUCT_FEEDBACK', priority: 'LOW', status: 'in_progress', assigneeId: agents[3].id, slaDeadline: new Date(now.getTime() + slaMap.LOW * 60000) },
    { title: '投诉：订单退款迟迟不到账', description: '我上周申请的退款，到现在已经5天了还没有到账，要求立即处理并赔偿。', category: 'COMPLAINT', priority: 'HIGH', status: 'open', assigneeId: agents[1].id, slaDeadline: new Date(now.getTime() + slaMap.HIGH * 60000) },
    { title: '请问如何导出月度报表？', description: '想导出上个月的销售数据报表，在后台找了很久没找到入口。', category: 'INQUIRY', priority: 'MEDIUM', status: 'resolved', assigneeId: agents[0].id, slaDeadline: new Date(now.getTime() + slaMap.MEDIUM * 60000), resolvedAt: new Date(now.getTime() - 3600000), satisfaction: 5 },
    { title: '支付接口报错 500', description: '用户在支付时频繁遇到 500 内部服务器错误，导致交易失败。', category: 'TECH_SUPPORT', priority: 'URGENT', status: 'in_progress', assigneeId: agents[2].id, slaDeadline: new Date(now.getTime() + slaMap.URGENT * 60000) },
    { title: '希望能增加批量导入功能', description: '目前只能一个一个添加商品，效率太低，建议支持 Excel 批量导入。', category: 'PRODUCT_FEEDBACK', priority: 'MEDIUM', status: 'open', assigneeId: agents[3].id, slaDeadline: new Date(now.getTime() + slaMap.MEDIUM * 60000) },
    { title: '客服态度恶劣，要求道歉', description: '刚才联系客服咨询问题，对方态度非常不耐烦，甚至直接挂断了对话。', category: 'COMPLAINT', priority: 'HIGH', status: 'open', assigneeId: agents[1].id, slaDeadline: new Date(now.getTime() + slaMap.HIGH * 60000) },
    { title: '系统卡顿严重，操作响应慢', description: '从今天下午开始，系统变得非常卡顿，每个操作都要等好几秒。', category: 'TECH_SUPPORT', priority: 'HIGH', status: 'open', assigneeId: agents[2].id, slaDeadline: new Date(now.getTime() + slaMap.HIGH * 60000) },
  ];

  for (const t of tickets) {
    await prisma.ticket.create({ data: t });
  }

  console.log('✅ 种子数据已创建');
  console.log(`- 处理人: ${agents.length} 个`);
  console.log(`- 工单: ${tickets.length} 条`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
