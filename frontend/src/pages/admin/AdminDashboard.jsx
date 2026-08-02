import React from 'react';
import KPICardRow from '../../components/ui/KPICardRow';
import KPICard from '../../components/ui/KPICard';
import ChartCard from '../../components/ui/ChartCard';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import DataTable from '../../components/ui/DataTable';
import { IconTrophy, IconUsers, IconUser, IconCoin, IconCalendarEvent, IconLivePhoto } from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Jan', revenue: 4000, auctions: 24 },
  { name: 'Feb', revenue: 3000, auctions: 13 },
  { name: 'Mar', revenue: 2000, auctions: 98 },
  { name: 'Apr', revenue: 2780, auctions: 39 },
  { name: 'May', revenue: 1890, auctions: 48 },
  { name: 'Jun', revenue: 2390, auctions: 38 },
  { name: 'Jul', revenue: 3490, auctions: 43 },
];

const mockRecentAuctions = [
  { id: 1, name: 'IPL 2026 Mega Auction', date: '2026-08-15', teams: 10, players: 450, revenue: '₹4.5B', status: 'upcoming' },
  { id: 2, name: 'BBL 2026 Draft', date: '2026-07-20', teams: 8, players: 320, revenue: '₹1.2B', status: 'completed' },
  { id: 3, name: 'WPL 2026 Mini Auction', date: '2026-07-24', teams: 5, players: 150, revenue: '₹800M', status: 'live' },
  { id: 4, name: 'PSL 2026 Draft', date: '2026-06-10', teams: 6, players: 280, revenue: '₹950M', status: 'completed' },
  { id: 5, name: 'SA20 2026 Auction', date: '2026-09-05', teams: 6, players: 200, revenue: '₹1.1B', status: 'upcoming' },
];
const columns = [
  { header: 'Auction Name', accessorKey: 'name' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Teams', accessorKey: 'teams' },
  { header: 'Players', accessorKey: 'players' },
  { header: 'Revenue', accessorKey: 'revenue' },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      </div>

      <KPICardRow>
        <KPICard
          title="Total Auctions"
          value="142"
          icon={IconTrophy}
          trend={12}
          trendLabel="vs last year"
        />
        <KPICard
          title="Total Teams"
          value="856"
          icon={IconUsers}
          trend={5}
          trendLabel="vs last year"
        />
        <KPICard
          title="Total Players"
          value="12,450"
          icon={IconUser}
          trend={18}
          trendLabel="vs last year"
        />
        <KPICard
          title="Total Revenue"
          value="₹8.4B"
          icon={IconCoin}
          trend={24}
          trendLabel="vs last year"
        />
      </KPICardRow>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard 
            title="Auction Revenue Overview"
            subtitle="Monthly revenue from all auctions in current year"
          >
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live & Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'WPL 2026 Mini Auction', type: 'Mini Auction', date: 'Today, 14:00', status: 'live', color: 'bg-blue-500' },
                  { name: 'IPL 2026 Mega Auction', type: 'Mega Auction', date: 'Aug 15, 2026', status: 'upcoming', color: 'bg-yellow-500' },
                  { name: 'SA20 2026 Auction', type: 'Draft', date: 'Sep 05, 2026', status: 'upcoming', color: 'bg-green-500' },
                ].map((auction, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white ${auction.color}`}>
                      <IconTrophy className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{auction.name}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                        <span>{auction.type}</span>
                        <span>•</span>
                        <span>{auction.date}</span>
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={auction.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Auctions</CardTitle>
              <button className="text-sm text-amber-600 font-medium hover:text-amber-700">View All</button>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockRecentAuctions}
                columns={columns}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Players by Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Virat Kohli', role: 'Batter', price: '₹24.5 Cr', auction: 'IPL 2026 Mega' },
                  { name: 'Rashid Khan', role: 'Bowler', price: '₹22.0 Cr', auction: 'IPL 2026 Mega' },
                  { name: 'Ben Stokes', role: 'All-Rounder', price: '₹18.5 Cr', auction: 'IPL 2026 Mega' },
                  { name: 'Smriti Mandhana', role: 'Batter', price: '₹4.2 Cr', auction: 'WPL 2026' },
                  { name: 'Ellyse Perry', role: 'All-Rounder', price: '₹3.8 Cr', auction: 'WPL 2026' },
                ].map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconUser className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.role} • {player.auction}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {player.price}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;