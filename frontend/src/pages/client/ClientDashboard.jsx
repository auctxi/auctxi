import React, { useState } from 'react';
import KPICardRow from '../../components/ui/KPICardRow';
import KPICard from '../../components/ui/KPICard';
import AuctionCard from '../../components/ui/AuctionCard';
import { Card, CardContent } from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import { IconTrophy, IconCalendarEvent, IconCoinRupee, IconWallet } from '@tabler/icons-react';

const mockActiveAuctions = [
  {
    id: 'a1',
    name: 'Premier Corporate League 2026',
    status: 'LIVE',
    startTime: '2026-07-25T10:00:00Z',
    totalTeams: 8,
    teamsJoined: 8,
    type: 'Corporate',
    location: 'Mumbai, India',
    startingPrice: 100000000,
    entryFee: 50000,
    logoBg: 'bg-blue-600 text-white',
    isWatchlisted: true
  },
  {
    id: 'a2',
    name: 'Weekend Warriors T20',
    status: 'UPCOMING',
    startTime: '2026-08-10T14:30:00Z',
    totalTeams: 12,
    teamsJoined: 10,
    type: 'Local League',
    location: 'Delhi, India',
    startingPrice: 50000000,
    entryFee: 25000,
    logoBg: 'bg-green-600 text-white',
    isWatchlisted: false
  }
];

const mockRecentActivities = [
  { id: '1', date: '2026-07-23', action: 'Joined Auction', details: 'Weekend Warriors T20', status: 'Success' },
  { id: '2', date: '2026-07-22', action: 'Budget Update', details: 'Added ₹10,00,000 to wallet', status: 'Success' },
  { id: '3', date: '2026-07-20', action: 'Player Bid', details: 'Won bid for Virat K. (PCL)', status: 'Success' },
];

const activityColumns = [
  { header: 'Date', accessorKey: 'date' },
  { header: 'Action', accessorKey: 'action' },
  { header: 'Details', accessorKey: 'details' },
  { header: 'Status', accessorKey: 'status', cell: ({ row }) => (
    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
      {row.original.status}
    </span>
  ) }
];

const ClientDashboard = () => {
  const [auctions, setAuctions] = useState(mockActiveAuctions);

  const handleWatchlistToggle = (id) => {
    setAuctions(auctions.map(a => 
      a.id === id ? { ...a, isWatchlisted: !a.isWatchlisted } : a
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Super Kings Owner</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your teams and auctions today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICardRow>
        <KPICard title="My Teams" value="3" icon={<IconTrophy size={20} />} trend="+1 this month" />
        <KPICard title="Upcoming Auctions" value="2" icon={<IconCalendarEvent size={20} />} />
        <KPICard title="Total Spent" value="₹4.2Cr" icon={<IconCoinRupee size={20} />} trend="Avg ₹1.4Cr/team" trendDown={false} />
        <KPICard title="Remaining Budget" value="₹1.8Cr" icon={<IconWallet size={20} />} />
      </KPICardRow>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Active Auctions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">My Active Auctions</h2>
            <a href="/client/auctions" className="text-[#f59e0b] hover:text-amber-600 font-medium text-sm">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.map(auction => (
              <AuctionCard 
                key={auction.id} 
                auction={auction} 
                onWatchlistToggle={handleWatchlistToggle}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          <Card className="h-full">
            <CardContent className="p-0">
              <DataTable 
                columns={activityColumns} 
                data={mockRecentActivities} 
                className="border-none shadow-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;