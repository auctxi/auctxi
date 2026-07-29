import React, { useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import KPICard from '../../../components/ui/KPICard';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { IconReceipt, IconCheck, IconClock, IconX, IconDownload, IconEye } from '@tabler/icons-react';

const mockPayments = [
  { id: 'PAY-1029', team: 'Royal Challengers Bangalore', user: 'Virat K.', type: 'Auction Fee', amount: '₹5,00,000', datetime: '2025-10-15 14:30', status: 'Successful', txnId: 'TXN-9382103' },
  { id: 'PAY-1030', team: 'Chennai Super Kings', user: 'MS Dhoni', type: 'Registration', amount: '₹1,00,000', datetime: '2025-10-15 15:45', status: 'Pending', txnId: '-' },
  { id: 'PAY-1031', team: 'Mumbai Indians', user: 'Rohit S.', type: 'Fine', amount: '₹50,000', datetime: '2025-10-16 09:15', status: 'Failed', txnId: 'TXN-9382105' },
  { id: 'PAY-1032', team: 'Delhi Capitals', user: 'Rishabh P.', type: 'Auction Fee', amount: '₹5,00,000', datetime: '2025-10-16 11:20', status: 'Successful', txnId: 'TXN-9382106' },
  { id: 'PAY-1033', team: 'Gujarat Titans', user: 'Shubman G.', type: 'Auction Fee', amount: '₹5,00,000', datetime: '2025-10-17 10:00', status: 'Successful', txnId: 'TXN-9382107' },
];

export default function PaymentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { header: 'Payment ID', accessorKey: 'id' },
    { header: 'Team', accessorKey: 'team' },
    { header: 'User', accessorKey: 'user' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Amount', accessorKey: 'amount' },
    { header: 'Date & Time', accessorKey: 'datetime' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        let variant = 'default';
        if (status === 'Successful') variant = 'success';
        else if (status === 'Pending') variant = 'warning';
        else if (status === 'Failed') variant = 'danger';
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    { header: 'Transaction ID', accessorKey: 'txnId' },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" icon={<IconEye size={16} />} aria-label="View payment details" />
      )
    }
  ];

  const filters = [
    {
      name: 'type',
      placeholder: 'Payment Type',
      options: [
        { label: 'Auction Fee', value: 'auction_fee' },
        { label: 'Registration', value: 'registration' },
        { label: 'Fine', value: 'fine' },
      ]
    },
    {
      name: 'status',
      placeholder: 'All Statuses',
      options: [
        { label: 'Successful', value: 'successful' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
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
      name: 'dateRange',
      placeholder: 'Date Range',
      options: [
        { label: 'Last 7 Days', value: '7d' },
        { label: 'Last 30 Days', value: '30d' },
        { label: 'This Month', value: 'this_month' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Payments" 
        actions={
          <Button variant="outline" icon={<IconDownload size={18} />}>Export</Button>
        }
      />

      <KPICardRow>
        <KPICard title="Total Payments" value="₹24.5 Cr" icon={<IconReceipt size={24} />} />
        <KPICard title="Successful Payments" value="1,245" icon={<IconCheck size={24} />} />
        <KPICard title="Pending Payments" value="32" icon={<IconClock size={24} />} />
        <KPICard title="Failed Payments" value="14" icon={<IconX size={24} />} />
      </KPICardRow>

      <SearchFilterBar 
        searchPlaceholder="Search payments by ID, Team, User or Txn ID..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(name, value) => console.log(name, value)}
      />

      <DataTable 
        data={mockPayments}
        columns={columns}
      />

      <div className="mt-4">
        <Pagination 
          currentPage={currentPage} 
          totalPages={15} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
