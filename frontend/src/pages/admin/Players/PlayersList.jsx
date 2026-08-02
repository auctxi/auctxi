import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../utils/cn';
import playerService from '../../../services/playerService';
import {
  IconPlus, IconEdit, IconTrash, IconUser,
  IconUsers, IconAlertCircle, IconTrophy,
  IconUserCheck, IconUserX
} from '@tabler/icons-react';

import PageHeader from '../../../components/ui/PageHeader';
import DataTable from '../../../components/ui/DataTable';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import KPICard from '../../../components/ui/KPICard';
import Button from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Modal } from '../../../components/common/Modal';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionMenu from '../../../components/ui/ActionMenu';
import EmptyState from '../../../components/ui/EmptyState';

const PlayersList = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';
  
  // State
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Tabs for Manager: 'all' | 'my'
  const [activeTab, setActiveTab] = useState('all');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Batsman',
    category: 'Uncapped',
    basePrice: '',
    imageUrl: '',
    statistics: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination (local implementation)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Data fetching
  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (!isAdmin && activeTab === 'my') {
        params.ownerId = user.id; // Or according to backend API spec for private filtering
      }
      
      const response = await playerService.getAll(params);
      setPlayers(response?.data || response || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch players');
    } finally {
      setLoading(false);
    }
  }, [isAdmin, activeTab, user]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, categoryFilter, statusFilter, activeTab]);

  // Derived state (filtering & search)
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      // For manager 'my' tab, double check locally if needed
      if (!isAdmin && activeTab === 'my' && player.ownershipType !== 'PRIVATE') return false;
      
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'All' || player.role === roleFilter;
      const matchesCategory = categoryFilter === 'All' || player.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || player.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesCategory && matchesStatus;
    });
  }, [players, searchQuery, roleFilter, categoryFilter, statusFilter, activeTab, isAdmin]);

  // KPIs
  const stats = useMemo(() => {
    return {
      total: filteredPlayers.length,
      available: filteredPlayers.filter(p => p.status === 'Available').length,
      sold: filteredPlayers.filter(p => p.status === 'Sold').length,
      unsold: filteredPlayers.filter(p => p.status === 'Unsold').length,
    };
  }, [filteredPlayers]);

  // Handlers
  const handleOpenModal = (player = null) => {
    if (player) {
      setEditingPlayer(player);
      setFormData({
        name: player.name,
        role: player.role,
        category: player.category,
        basePrice: player.basePrice,
        imageUrl: player.imageUrl || '',
        statistics: player.statistics || ''
      });
    } else {
      setEditingPlayer(null);
      setFormData({
        name: '',
        role: 'Batsman',
        category: 'Uncapped',
        basePrice: '',
        imageUrl: '',
        statistics: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        basePrice: Number(formData.basePrice)
      };
      
      if (editingPlayer) {
        await playerService.update(editingPlayer.id, dataToSubmit);
      } else {
        await playerService.create(dataToSubmit);
      }
      
      handleCloseModal();
      fetchPlayers();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await playerService.delete(id);
        fetchPlayers();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };
  
  const formatPrice = (price) => {
    if (!price) return '₹0';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  // Columns definition
  const columns = [
    {
      key: 'name',
      header: 'Player',
      render: (player) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
            {player.imageUrl ? (
              <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <IconUser className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="font-medium text-gray-900">{player.name}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (player) => {
        const roleColors = {
          'Batsman': 'bg-blue-100 text-blue-800',
          'Bowler': 'bg-red-100 text-red-800',
          'All-Rounder': 'bg-purple-100 text-purple-800',
          'Wicket-Keeper': 'bg-green-100 text-green-800'
        };
        return <Badge className={roleColors[player.role] || 'bg-gray-100 text-gray-800'}>{player.role}</Badge>;
      }
    },
    {
      key: 'category',
      header: 'Category',
      render: (player) => (
        <Badge variant="outline">{player.category}</Badge>
      )
    },
    {
      key: 'basePrice',
      header: 'Base Price',
      render: (player) => (
        <span className="font-medium text-gray-700">{formatPrice(player.basePrice)}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (player) => <StatusBadge status={player.status} />
    }
  ];

  if (isAdmin) {
    columns.splice(4, 0, {
      key: 'ownership',
      header: 'Ownership',
      render: (player) => (
        <Badge variant={player.ownershipType === 'GLOBAL' ? 'primary' : 'outline'} className="text-xs uppercase">
          {player.ownershipType || 'GLOBAL'}
        </Badge>
      )
    });
  }
  
  columns.push({
    key: 'actions',
    header: '',
    align: 'right',
    render: (player) => (
      <ActionMenu
        items={[
          { label: 'Edit', icon: <IconEdit size={16} />, onClick: () => handleOpenModal(player) },
          { label: 'Delete', icon: <IconTrash size={16} />, onClick: () => handleDelete(player.id), danger: true }
        ]}
      />
    )
  });

  // Filter options
  const roleOptions = [
    { value: 'All', label: 'All Roles' },
    { value: 'Batsman', label: 'Batsman' },
    { value: 'Bowler', label: 'Bowler' },
    { value: 'All-Rounder', label: 'All-Rounder' },
    { value: 'Wicket-Keeper', label: 'Wicket-Keeper' }
  ];

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    { value: 'Capped', label: 'Capped' },
    { value: 'Uncapped', label: 'Uncapped' },
    { value: 'Overseas', label: 'Overseas' }
  ];
  
  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Available', label: 'Available' },
    { value: 'Sold', label: 'Sold' },
    { value: 'Unsold', label: 'Unsold' }
  ];

  const paginatedData = filteredPlayers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Player Management" 
        breadcrumbs={[{ label: 'Dashboard', path: '/admin/dashboard' }, { label: 'Players', path: '/admin/players' }]}
        actionLabel={(!isAdmin && activeTab === 'all') ? null : "+ Add Player"}
        onAction={(!isAdmin && activeTab === 'all') ? undefined : () => handleOpenModal()}
      />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Players" value={stats.total} icon={<IconUsers />} color="blue" />
        <KPICard title="Available" value={stats.available} icon={<IconUserCheck />} color="green" />
        <KPICard title="Sold" value={stats.sold} icon={<IconTrophy />} color="amber" />
        <KPICard title="Unsold" value={stats.unsold} icon={<IconUserX />} color="gray" />
      </div>

      {/* Tab Switcher for Manager */}
      {!isAdmin && (
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'all' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            All Players
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'my' ? "bg-amber-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            My Players
          </button>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100">
          <SearchFilterBar 
            searchPlaceholder="Search players..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filters={
              <div className="flex flex-wrap gap-3">
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  options={roleOptions}
                  className="w-40"
                />
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={categoryOptions}
                  className="w-40"
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={statusOptions}
                  className="w-40"
                />
              </div>
            }
          />
        </div>
        
        {/* Data Table */}
        <div className="p-0">
          {error ? (
            <div className="p-8 text-center text-red-500 flex flex-col items-center gap-2">
              <IconAlertCircle size={32} />
              <p>{error}</p>
              <Button variant="outline" size="sm" onClick={fetchPlayers}>Retry</Button>
            </div>
          ) : filteredPlayers.length === 0 && !loading ? (
            <EmptyState 
              icon={<IconUsers size={48} />}
              title="No players found"
              description="Try adjusting your filters or add a new player."
              action={(!isAdmin && activeTab === 'all') ? null : <Button onClick={() => handleOpenModal()}>Add Player</Button>}
            />
          ) : (
            <DataTable
              columns={columns}
              data={paginatedData}
              isLoading={loading}
              pagination={{
                currentPage,
                totalPages: Math.ceil(filteredPlayers.length / itemsPerPage) || 1,
                onPageChange: setCurrentPage,
                totalItems: filteredPlayers.length
              }}
            />
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPlayer ? 'Edit Player' : 'Add Player'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Player Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Virat Kohli"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              options={roleOptions.filter(o => o.value !== 'All')}
            />
            <Select
              label="Category"
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              options={categoryOptions.filter(o => o.value !== 'All')}
            />
          </div>
          
          <Input
            label="Base Price (₹)"
            type="number"
            required
            min="0"
            value={formData.basePrice}
            onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
            placeholder="e.g. 20000000"
          />
          
          <Input
            label="Image URL (optional)"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            placeholder="https://example.com/image.jpg"
          />
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Statistics (optional)</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
              rows="3"
              value={formData.statistics}
              onChange={(e) => setFormData({...formData, statistics: e.target.value})}
              placeholder="Matches, Runs, Wickets, etc."
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={handleCloseModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
              {editingPlayer ? 'Update Player' : 'Add Player'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PlayersList;
