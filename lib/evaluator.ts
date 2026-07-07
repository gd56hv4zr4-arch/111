// lib/evaluator.ts
// 工单质量评测引擎 —— SLA + 时效 + 满意度

export interface TicketMetrics {
  ticketId: string;
  createdAt: Date;
  resolvedAt?: Date;
  slaDeadline: Date;
  priority: string;
  satisfaction?: number;
}

export interface EvaluationResult {
  overallScore: number;
  slaCompliance: number;
  responseSpeed: number;
  resolutionQuality: number;
  details: {
    slaMet: boolean;
    responseTimeMinutes: number;
    resolutionTimeMinutes?: number;
    satisfactionNormalized?: number;
  };
  suggestions: string[];
}

const SLA_TARGETS: Record<string, number> = { URGENT: 60, HIGH: 240, MEDIUM: 1440, LOW: 4320 };
const RESPONSE_TARGETS: Record<string, number> = { URGENT: 15, HIGH: 60, MEDIUM: 240, LOW: 720 };

function getMinutesDiff(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

export function evaluateTicket(metrics: TicketMetrics): EvaluationResult {
  const now = new Date();
  const resolved = metrics.resolvedAt || now;
  const slaTarget = SLA_TARGETS[metrics.priority.toUpperCase()] || SLA_TARGETS['MEDIUM'];
  const resolutionMinutes = getMinutesDiff(metrics.createdAt, resolved);
  const slaMet = metrics.resolvedAt ? resolutionMinutes <= slaTarget : false;
  const slaCompliance = metrics.resolvedAt
    ? Math.max(0, 100 - (resolutionMinutes / slaTarget - 1) * 50)
    : Math.max(0, 100 - (getMinutesDiff(metrics.createdAt, now) / slaTarget) * 30);

  const responseTarget = RESPONSE_TARGETS[metrics.priority.toUpperCase()] || RESPONSE_TARGETS['MEDIUM'];
  const responseTimeMinutes = Math.min(getMinutesDiff(metrics.createdAt, now), responseTarget * 2);
  const responseSpeed = Math.max(0, 100 - (responseTimeMinutes / responseTarget - 1) * 40);

  let resolutionQuality = 70;
  if (metrics.satisfaction) resolutionQuality = metrics.satisfaction * 20;
  else if (metrics.resolvedAt) {
    if (resolutionMinutes <= slaTarget * 0.5) resolutionQuality += 20;
    else if (resolutionMinutes <= slaTarget) resolutionQuality += 10;
    else resolutionQuality -= 10;
  }
  resolutionQuality = Math.max(0, Math.min(100, resolutionQuality));

  const overallScore = Math.round(slaCompliance * 0.4 + responseSpeed * 0.3 + resolutionQuality * 0.3);

  const suggestions: string[] = [];
  if (!slaMet) suggestions.push('已超时，建议升级处理或拆分任务');
  if (responseSpeed < 60) suggestions.push('响应速度偏慢，建议设置自动提醒');
  if (!metrics.satisfaction) suggestions.push('尚未收集满意度，建议主动回访');
  if (resolutionQuality < 60) suggestions.push('解决质量偏低，建议复盘处理过程');

  return {
    overallScore: Math.min(100, overallScore),
    slaCompliance: Math.min(100, Math.round(slaCompliance)),
    responseSpeed: Math.min(100, Math.round(responseSpeed)),
    resolutionQuality: Math.round(resolutionQuality),
    details: { slaMet, responseTimeMinutes, resolutionTimeMinutes: metrics.resolvedAt ? resolutionMinutes : undefined, satisfactionNormalized: metrics.satisfaction ? metrics.satisfaction * 20 : undefined },
    suggestions,
  };
}

export function batchEvaluate(tickets: TicketMetrics[]): EvaluationResult[] {
  return tickets.map(t => evaluateTicket(t));
}

export function generateTeamReport(evaluations: EvaluationResult[]) {
  if (evaluations.length === 0) return null;
  const avgScore = evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length;
  const slaRate = evaluations.filter(e => e.details.slaMet).length / evaluations.length;
  const avgSat = evaluations.filter(e => e.details.satisfactionNormalized).reduce((sum, e) => sum + (e.details.satisfactionNormalized || 0), 0) / evaluations.length;
  return {
    totalTickets: evaluations.length,
    averageScore: Math.round(avgScore * 10) / 10,
    slaComplianceRate: Math.round(slaRate * 100),
    averageSatisfaction: Math.round(avgSat * 10) / 10,
    grade: avgScore >= 90 ? 'A' : avgScore >= 80 ? 'B' : avgScore >= 60 ? 'C' : 'D',
  };
}
