import React, { useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import KPICard from '../../../components/ui/KPICard';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { IconGavel, IconTrophy, IconArrowDownRight, IconCurrencyDollar, IconDownload, IconEye } from '@tabler/icons-react';

const mockBids = [
  { id: 'BID-001', auction: 'IPL 2026 Mega Auction', player: 'Virat Kohli', team: 'RCB', amount: '₹15,00,00,000', time: '10:30 AM', status: 'Winning' },
  { id: 'BID-002', auction: 'IPL 2026 Mega Auction', player: 'Virat Kohli', team: 'CSK', amount: '₹14,50,00,000', time: '10:29 AM', status: 'Outbid' },
  { id: 'BID-003', auction: 'IPL 2026 Mega Auction', player: 'MS Dhoni', team: 'CSK', amount: '₹12,00,00,000', time: '11:15 AM', status: 'Winning' },
  { id: 'BID-004', auction: 'WPL 2026 Auction', player: 'Smriti Mandhana', team: 'RCB', amount: '₹3,40,00,000', time: '02:45 PM', status: 'Winning' },
  { id: 'BID-005', auction: 'WPL 2026 Auction', player: 'Smriti Mandhana', team: 'MI', amount: '₹3,20,00,000', time: '02:44 PM', status: 'Outbid' },
];

export default function BidsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { header: 'Bid ID', accessorKey: 'id' },
    { header: 'Auction', accessorKey: 'auction' },
    { header: 'Player', accessorKey: 'player' },
    { header: 'Team', accessorKey: 'team' },
    { header: 'Bid Amount', accessorKey: 'amount' },
    { header: 'Bid Time', accessorKey: 'time' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge variant={status === 'Winning' ? 'success' : 'secondary'}>{status}</Badge>;
      }
    },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" icon={<IconEye size={16} />} aria-label="View bid details" />
      )
    }
  ];

  const filters = [
    {
      name: 'auction',
      placeholder: 'All Auctions',
      options: [
        { label: 'IPL 2026 Mega Auction', value: 'ipl2026' },
        { label: 'WPL 2026 Auction', value: 'wpl2026' },
      ]
    },
    {
      name: 'team',
      placeholder: 'All Teams',
      options: [
        { label: 'RCB', value: 'rcb' },
        { label: 'CSK', value: 'csk' },
        { label: 'MI', value: 'mi' },
      ]
    },
    {
      name: 'status',
      placeholder: 'All Statuses',
      options: [
        { label: 'Winning', value: 'winning' },
        { label: 'Outbid', value: 'outbid' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bids" 
        actions={
          <Button variant="outline" icon={<IconDownload size={18} />}>Export</Button>
        }
      />

      <KPICardRow>
        <KPICard title="Total Bids" value="8,432" icon={<IconGavel size={24} />} />
        <KPICard title="Winning Bids" value="1,240" icon={<IconTrophy size={24} />} />
        <KPICard title="Outbid Bids" value="7,192" icon={<IconArrowDownRight size={24} />} />
        <KPICard title="Total Bid Value" value="₹450 Cr" icon={<IconCurrencyDollar size={24} />} />
      </KPICardRow>

      <SearchFilterBar 
        searchPlaceholder="Search bids by ID, player, or team..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(name, value) => console.log(name, value)}
      />

      <DataTable 
        data={mockBids}
        columns={columns}
      />

      <div className="mt-4">
        <Pagination 
          currentPage={currentPage} 
          totalPages={25} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
