import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionMenu from '../../../components/ui/ActionMenu';

const MOCK_TEAMS = [
  { id: '1', name: 'Chennai Super Kings', abbreviation: 'CSK', players: 25, auctionsJoined: 5, status: 'Active', createdOn: '2023-01-15' },
  { id: '2', name: 'Mumbai Indians', abbreviation: 'MI', players: 24, auctionsJoined: 5, status: 'Active', createdOn: '2023-01-16' },
  { id: '3', name: 'Royal Challengers Bangalore', abbreviation: 'RCB', players: 22, auctionsJoined: 5, status: 'Active', createdOn: '2023-01-17' },
  { id: '4', name: 'Delhi Capitals', abbreviation: 'DC', players: 23, auctionsJoined: 5, status: 'Inactive', createdOn: '2023-01-18' },
];

export default function TeamsList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const kpis = [
    { title: 'Total Teams', value: '10' },
    { title: 'Active Teams', value: '8' },
    { title: 'Inactive Teams', value: '2' },
    { title: 'Total Players', value: '240' },
  ];
  const columns = [
    {
      key: 'name',
      header: 'Team Name',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
            {item.abbreviation}
          </div>
          <span className="font-medium text-gray-900">{item.name}</span>
        </div>
      ),
    },
    { key: 'abbreviation', header: 'Abbreviation' },
    { key: 'players', header: 'Players' },
    { key: 'auctionsJoined', header: 'Auctions Joined' },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    { key: 'createdOn', header: 'Created On' },
    {
      key: 'actions',
      header: 'Action',
      render: (item) => (
        <ActionMenu
          actions={[
            { label: 'View Details', onClick: () => navigate(`/admin/teams/${item.id}`) },
            { label: 'Edit', onClick: () => console.log('Edit', item.id) },
            { label: 'Delete', onClick: () => console.log('Delete', item.id), danger: true },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teams"
        description="Manage auction teams and their budgets."
        primaryAction={{
          label: '+ Add Team',
          onClick: () => navigate('/admin/teams/create'),
        }}
      />

      <KPICardRow kpis={kpis} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SearchFilterBar
          searchPlaceholder="Search teams by name or abbreviation..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={[
            {
              id: 'status',
              label: 'Status',
              options: [
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ],
            },
            {
              id: 'auction',
              label: 'Auction',
              options: [
                { value: 'all', label: 'All Auctions' },
                { value: 'ipl2024', label: 'IPL 2024' },
                { value: 'wpl2024', label: 'WPL 2024' },
              ],
            }
          ]}
          onFilterChange={(filterId, value) => console.log(filterId, value)}
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={MOCK_TEAMS}
          keyExtractor={(item) => item.id}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
        totalItems={MOCK_TEAMS.length}
        itemsPerPage={10}
      />
    </div>
  );
}
