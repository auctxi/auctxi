import React from 'react';
import PageHeader from "../../components/ui/PageHeader";
import KPICardRow from "../../components/ui/KPICardRow";
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import { IconGavel, IconUsers, IconUserCheck, IconWallet } from '@tabler/icons-react';

/**
 * ManagerDashboard component - Overview for the auction manager
 * @returns {JSX.Element}
 */
export default function ManagerDashboard() {
  const kpiData = [
    {
      title: 'Active Auction',
      value: 'IPL 2026 Mega Auction',
      icon: IconGavel,
      trend: { value: 1, isPositive: true, label: 'Live' }
    },
    {
      title: 'Total Players',
      value: '590',
      icon: IconUsers,
      trend: { value: 12, isPositive: true, label: 'Registered' }
    },
    {
      title: 'Players Sold',
      value: '142',
      icon: IconUserCheck,
      trend: { value: 5, isPositive: true, label: 'Since last hr' }
    },
    {
      title: 'Total Purse Remaining',
      value: '₹45.5 Cr',
      icon: IconWallet,
      trend: { value: 10, isPositive: false, label: 'Spent' }
    }
  ];

  const upcomingAuctions = [
    { id: 1, name: 'BBL 2026 Draft', date: 'Aug 15, 2026', status: 'Scheduled' },
    { id: 2, name: 'WPL 2027 Auction', date: 'Oct 10, 2026', status: 'Draft' },
  ];

  const recentBidsColumns = [
    { header: 'Player', accessorKey: 'player' },
    { header: 'Team', accessorKey: 'team' },
    { header: 'Amount', accessorKey: 'amount' },
    { header: 'Time', accessorKey: 'time' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'Sold' ? 'success' : 'warning'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  const recentBidsData = [
    { id: 1, player: 'Virat Kohli', team: 'RCB', amount: '₹15.0 Cr', time: '10:45 AM', status: 'Sold' },
    { id: 2, player: 'Pat Cummins', team: 'SRH', amount: '₹20.5 Cr', time: '10:30 AM', status: 'Sold' },
    { id: 3, player: 'Steve Smith', team: 'CSK', amount: '₹2.0 Cr', time: '10:15 AM', status: 'Pending' },
    { id: 4, player: 'Jasprit Bumrah', team: 'MI', amount: '₹12.0 Cr', time: '10:00 AM', status: 'Sold' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manager Dashboard"
        description="Overview of your current and upcoming auctions."
      />

      <KPICardRow items={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={recentBidsColumns}
                data={recentBidsData}
                keyField="id"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAuctions.map(auction => (
                  <div key={auction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{auction.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{auction.date}</p>
                    </div>
                    <Badge variant={auction.status === 'Scheduled' ? 'info' : 'default'}>
                      {auction.status}
                    </Badge>
                  </div>
                ))}
                {upcomingAuctions.length === 0 && (
                  <div className="text-center py-4 text-sm text-gray-500">
                    No upcoming auctions.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}