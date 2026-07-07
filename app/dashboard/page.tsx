// app/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const categoryData = [
  { name: '技术支持', value: 35, color: '#6366f1' },
  { name: '产品反馈', value: 20, color: '#8b5cf6' },
  { name: '投诉', value: 15, color: '#ef4444' },
  { name: '咨询', value: 25, color: '#10b981' },
  { name: '未分类', value: 5, color: '#94a3b8' },
];

const trendData = [
  { date: '周一', created: 12, resolved: 8 },
  { date: '周二', created: 15, resolved: 12 },
  { date: '周三', created: 8, resolved: 15 },
  { date: '周四', created: 20, resolved: 18 },
  { date: '周五', created: 18, resolved: 20 },
  { date: '周六', created: 5, resolved: 6 },
  { date: '周日', created: 4, resolved: 5 },
];

const agentLoad = [
  { name: '张伟', load: 3, capacity: 8 },
  { name: '李娜', load: 5, capacity: 10 },
  { name: '王强', load: 2, capacity: 6 },
  { name: '刘芳', load: 4, capacity: 12 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">📊 数据看板</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>工单分类分布</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>处理人负载</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentLoad} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 12]} />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip /><Legend />
                  <Bar dataKey="load" fill="#6366f1" name="当前负载" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="capacity" fill="#e2e8f0" name="容量上限" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>本周工单趋势</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" /><YAxis />
                  <Tooltip /><Legend />
                  <Line type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={2} name="新建" />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="解决" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
