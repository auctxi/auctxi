import React from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import KPICard from '../../../components/ui/KPICard';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import StatusBadge from '../../../components/ui/StatusBadge';
import Pagination from '../../../components/ui/Pagination';
import Button from '../../../components/ui/Button';
import { IconTrophy, IconCalendarEvent, IconLivePhoto, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const mockAuctionsData = [
  { id: 1, name: 'IPL 2026 Mega Auction', type: 'Mega Auction', datetime: '2026-08-15 10:00', teams: 10, status: 'upcoming', totalBids: 0, highestBid: '-' },
  { id: 2, name: 'WPL 2026 Mini Auction', type: 'Mini Auction', datetime: '2026-07-24 14:00', teams: 5, status: 'live', totalBids: 452, highestBid: '₹4.2 Cr' },
  { id: 3, name: 'BBL 2026 Draft', type: 'Draft', datetime: '2026-07-20 18:00', teams: 8, status: 'completed', totalBids: 890, highestBid: '$1.2M' },
  { id: 4, name: 'PSL 2026 Draft', type: 'Draft', datetime: '2026-06-10 15:00', teams: 6, status: 'completed', totalBids: 620, highestBid: '$800K' },
  { id: 5, name: 'SA20 2026 Auction', type: 'Auction', datetime: '2026-09-05 11:00', teams: 6, status: 'upcoming', totalBids: 0, highestBid: '-' },
  { id: 6, name: 'CPL 2026 Draft', type: 'Draft', datetime: '2026-09-15 09:00', teams: 6, status: 'upcoming', totalBids: 0, highestBid: '-' },
  { id: 7, name: 'The Hundred 2026 Draft', type: 'Draft', datetime: '2026-03-20 14:00', teams: 8, status: 'completed', totalBids: 750, highestBid: '£125K' },
];

const filterOptions = [
  {
    name: 'status',
    label: 'Status',
    options: [
      { value: 'all', label: 'All Statuses' },
      { value: 'live', label: 'Live' },
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'completed', label: 'Completed' },
    ]
  },
  {
    name: 'type',
    label: 'Auction Type',
    options: [
      { value: 'all', label: 'All Types' },
      { value: 'mega', label: 'Mega Auction' },
      { value: 'mini', label: 'Mini Auction' },
      { value: 'draft', label: 'Draft' },
    ]
  }
];

const AuctionsList = () => {
  const navigate = useNavigate();

  const handleAction = (id) => {
    navigate(`/admin/auctions/${id}`);
  };

  const columns = [
    { header: 'Auction Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Date & Time', accessorKey: 'datetime' },
    { header: 'Teams', accessorKey: 'teams' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    { header: 'Total Bids', accessorKey: 'totalBids' },
    { header: 'Highest Bid', accessorKey: 'highestBid' },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleAction(row.original.id)}
        >
          View
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Auctions" 
        actionLabel="+ Create Auction"
        onAction={() => navigate('/admin/auctions/create')}
      />

      <KPICardRow>
        <KPICard
          title="Total Auctions"
          value="142"
          icon={<IconTrophy className="w-5 h-5" />}
        />
        <KPICard
          title="Live Auctions"
          value="1"
          icon={<IconLivePhoto className="w-5 h-5 text-red-500" />}
        />
        <KPICard
          title="Upcoming Auctions"
          value="3"
          icon={<IconCalendarEvent className="w-5 h-5 text-amber-500" />}
        />
        <KPICard
          title="Completed Auctions"
          value="138"
          icon={<IconCheck className="w-5 h-5 text-emerald-500" />}
        />
      </KPICardRow>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <SearchFilterBar 
            placeholder="Search auctions..." 
            filters={filterOptions}
            onSearch={(val) => console.log('Search:', val)}
            onFilterChange={(filters) => console.log('Filters:', filters)}
          />
        </div>
        
        <DataTable 
          data={mockAuctionsData}
          columns={columns}
        />
        
        <div className="p-4 border-t border-gray-200">
          <Pagination 
            currentPage={1}
            totalPages={10}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionsList;
