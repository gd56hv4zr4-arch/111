// types/index.ts

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketCategory = 'TECH_SUPPORT' | 'PRODUCT_FEEDBACK' | 'COMPLAINT' | 'INQUIRY' | 'UNCATEGORIZED';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId?: string;
  assignee?: Agent;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  slaDeadline: string;
  satisfaction?: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills: string[];
  capacity: number;
  currentLoad: number;
  performance: number;
  createdAt: string;
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  overdue: number;
  avgResolutionTime: number;
  satisfactionRate: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DailyTrend {
  date: string;
  created: number;
  resolved: number;
}
