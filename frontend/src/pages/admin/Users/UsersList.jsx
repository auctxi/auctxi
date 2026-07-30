import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import KPICard from '../../../components/ui/KPICard';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { IconUsers, IconUserCheck, IconUserX, IconUserMinus, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Owner', team: 'Mumbai Indians', status: 'Active', joinedOn: '2025-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Auctioneer', team: '-', status: 'Active', joinedOn: '2025-01-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Team Owner', team: 'Chennai Super Kings', status: 'Inactive', joinedOn: '2025-02-01' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', team: '-', status: 'Blocked', joinedOn: '2025-02-10' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Team Owner', team: 'Royal Challengers Bangalore', status: 'Active', joinedOn: '2025-02-15' },
];

export default function UsersList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddUser = () => navigate('/admin/users/create');

  const columns = [
    { header: 'User Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Team', accessorKey: 'team' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        let variant = 'default';
        if (status === 'Active') variant = 'success';
        else if (status === 'Inactive') variant = 'warning';
        else if (status === 'Blocked') variant = 'danger';
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    { header: 'Joined On', accessorKey: 'joinedOn' },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<IconEye size={16} />} aria-label="View user" />
          <Button variant="ghost" size="sm" icon={<IconEdit size={16} />} aria-label="Edit user" />
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" icon={<IconTrash size={16} />} aria-label="Delete user" />
        </div>
      )
    }
  ];

  const filters = [
    {
      name: 'role',
      placeholder: 'All Roles',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Auctioneer', value: 'auctioneer' },
        { label: 'Team Owner', value: 'team_owner' },
        { label: 'Viewer', value: 'viewer' },
      ]
    },
    {
      name: 'status',
      placeholder: 'All Statuses',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Blocked', value: 'blocked' },
      ]
    },
    {
      name: 'joinedDate',
      placeholder: 'Joined Date',
      options: [
        { label: 'Last 7 Days', value: '7d' },
        { label: 'Last 30 Days', value: '30d' },
        { label: 'This Year', value: '1y' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Users" 
        actions={
          <Button variant="primary" onClick={handleAddUser}>+ Add User</Button>
        }
      />

      <KPICardRow>
        <KPICard title="Total Users" value="1,245" icon={<IconUsers size={24} />} />
        <KPICard title="Active Users" value="1,080" icon={<IconUserCheck size={24} />} trend={{ value: '+5.2%', isPositive: true }} />
        <KPICard title="Inactive Users" value="142" icon={<IconUserMinus size={24} />} trend={{ value: '-2.1%', isPositive: true }} />
        <KPICard title="Blocked Users" value="23" icon={<IconUserX size={24} />} trend={{ value: '+1.4%', isPositive: false }} />
      </KPICardRow>

      <SearchFilterBar 
        searchPlaceholder="Search users by name or email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(name, value) => console.log(name, value)}
      />

      <DataTable 
        data={mockUsers}
        columns={columns}
      />

      <div className="mt-4">
        <Pagination 
          currentPage={currentPage} 
          totalPages={10} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
