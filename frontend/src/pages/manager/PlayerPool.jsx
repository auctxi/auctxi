import React, { useState, useMemo } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import { IconGavel } from '@tabler/icons-react';

const MOCK_PLAYERS = [
  { id: 1, name: 'Virat Kohli', role: 'Batsman', status: 'Available', basePrice: '2.0 Cr', image: 'https://i.pravatar.cc/150?u=virat' },
  { id: 2, name: 'Jasprit Bumrah', role: 'Bowler', status: 'Sold', basePrice: '2.0 Cr', image: 'https://i.pravatar.cc/150?u=jasprit' },
  { id: 3, name: 'Hardik Pandya', role: 'All-Rounder', status: 'Available', basePrice: '1.5 Cr', image: 'https://i.pravatar.cc/150?u=hardik' },
  { id: 4, name: 'MS Dhoni', role: 'Wicket Keeper', status: 'Unsold', basePrice: '1.0 Cr', image: 'https://i.pravatar.cc/150?u=msd' },
  { id: 5, name: 'Rohit Sharma', role: 'Batsman', status: 'Sold', basePrice: '2.0 Cr', image: 'https://i.pravatar.cc/150?u=rohit' },
  { id: 6, name: 'Rashid Khan', role: 'Bowler', status: 'Available', basePrice: '1.5 Cr', image: 'https://i.pravatar.cc/150?u=rashid' },
  { id: 7, name: 'Ben Stokes', role: 'All-Rounder', status: 'Available', basePrice: '2.0 Cr', image: 'https://i.pravatar.cc/150?u=ben' },
  { id: 8, name: 'Trent Boult', role: 'Bowler', status: 'Available', basePrice: '1.5 Cr', image: 'https://i.pravatar.cc/150?u=trent' }
];

export default function PlayerPool() {
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchCat = categoryFilter === 'All' || p.role === categoryFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [searchValue, categoryFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchValue('');
    setCategoryFilter('All');
    setStatusFilter('All');
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'Available': return 'info';
      case 'Sold': return 'success';
      case 'Unsold': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Player Pool" 
        breadcrumbs={[{ label: 'Dashboard', path: '/manager' }, { label: 'Player Pool' }]}
      />

      <SearchFilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onClearFilters={handleClearFilters}
        filters={[
          {
            label: 'Category',
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
              { label: 'All Categories', value: 'All' },
              { label: 'Batsman', value: 'Batsman' },
              { label: 'Bowler', value: 'Bowler' },
              { label: 'All-Rounder', value: 'All-Rounder' },
              { label: 'Wicket Keeper', value: 'Wicket Keeper' }
            ]
          },
          {
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'All Statuses', value: 'All' },
              { label: 'Available', value: 'Available' },
              { label: 'Sold', value: 'Sold' },
              { label: 'Unsold', value: 'Unsold' }
            ]
          }
        ]}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <Card key={player.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100">
                <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={player.status} variant={getStatusVariant(player.status)} />
                </div>
              </div>
              <CardContent className="p-5 pt-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{player.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">{player.role}</div>
                  <div className="mt-3 font-medium text-gray-900 flex items-center gap-2">
                    <span className="text-gray-500 text-sm font-normal">Base Price: </span>
                    {player.basePrice}
                  </div>
                </div>
                
                <Button 
                  variant={player.status === 'Available' ? 'primary' : 'outline'} 
                  className="w-full justify-center"
                  disabled={player.status !== 'Available'}
                >
                  <IconGavel size={18} className="mr-2" />
                  {player.status === 'Available' ? 'Send to Auction' : 'Unavailable'}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            No players found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
