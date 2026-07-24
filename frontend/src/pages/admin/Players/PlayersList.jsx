import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import StatusBadge from '../../../components/ui/StatusBadge';
import RoleBadge from '../../../components/ui/RoleBadge';
import ActionMenu from '../../../components/ui/ActionMenu';

const MOCK_PLAYERS = [
  { id: '1', name: 'Virat Kohli', team: 'RCB', role: 'Batter', basePrice: '2.0 Cr', status: 'Sold', soldPrice: '15.0 Cr', auction: 'IPL 2024' },
  { id: '2', name: 'Jasprit Bumrah', team: 'MI', role: 'Bowler', basePrice: '2.0 Cr', status: 'Sold', soldPrice: '12.0 Cr', auction: 'IPL 2024' },
  { id: '3', name: 'Ben Stokes', team: '-', role: 'All-rounder', basePrice: '2.0 Cr', status: 'Available', soldPrice: '-', auction: 'IPL 2024' },
  { id: '4', name: 'Adil Rashid', team: '-', role: 'Bowler', basePrice: '1.5 Cr', status: 'Unsold', soldPrice: '-', auction: 'IPL 2024' },
];

export default function PlayersList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const kpis = [
    { title: 'Total Players', value: '450' },
    { title: 'Active Players', value: '420' },
    { title: 'Sold Players', value: '180' },
    { title: 'Unsold Players', value: '45' },
  ];

  const columns = [
    {
      key: 'name',
      header: 'Player Name',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
            {item.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900">{item.name}</span>
        </div>
      ),
    },
    { key: 'team', header: 'Team' },
    {
      key: 'role',
      header: 'Role',
      render: (_, item) => <RoleBadge role={item.role} />,
    },
    { key: 'basePrice', header: 'Base Price' },
    {
      key: 'status',
      header: 'Status',
      render: (_, item) => {
        let badgeStatus = 'Active';
        if (item.status === 'Sold') badgeStatus = 'Completed';
        else if (item.status === 'Unsold') badgeStatus = 'Inactive';
        return <StatusBadge status={badgeStatus} label={item.status} />;
      },
    },
    { key: 'soldPrice', header: 'Sold Price' },
    { key: 'auction', header: 'Auction' },
    {
      key: 'actions',
      header: 'Action',
      render: (_, item) => (
        <ActionMenu
          actions={[
            { label: 'View Details', onClick: () => navigate(`/admin/players/${item.id}`) },
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
        title="Players"
        description="Manage auction players, categories, and base prices."
        primaryAction={{
          label: '+ Add Player',
          onClick: () => navigate('/admin/players/create'),
        }}
      />

      <KPICardRow kpis={kpis} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SearchFilterBar
          searchPlaceholder="Search players by name..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={[
            {
              id: 'team',
              label: 'Team',
              options: [
                { value: 'all', label: 'All Teams' },
                { value: 'csk', label: 'CSK' },
                { value: 'rcb', label: 'RCB' },
                { value: 'mi', label: 'MI' },
              ],
            },
            {
              id: 'role',
              label: 'Role',
              options: [
                { value: 'all', label: 'All Roles' },
                { value: 'batter', label: 'Batter' },
                { value: 'bowler', label: 'Bowler' },
                { value: 'allrounder', label: 'All-rounder' },
                { value: 'wicketkeeper', label: 'Wicketkeeper' },
              ],
            },
            {
              id: 'status',
              label: 'Status',
              options: [
                { value: 'all', label: 'All Statuses' },
                { value: 'available', label: 'Available' },
                { value: 'sold', label: 'Sold' },
                { value: 'unsold', label: 'Unsold' },
              ],
            }
          ]}
          onFilterChange={(filterId, value) => console.log(filterId, value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={MOCK_PLAYERS}
          keyExtractor={(item) => item.id}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
        totalItems={MOCK_PLAYERS.length}
        itemsPerPage={10}
      />
    </div>
  );
}
