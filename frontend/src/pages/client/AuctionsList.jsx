import React, { useState } from 'react';
import AuctionCard from '../../components/ui/AuctionCard';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import PageHeader from '../../components/ui/PageHeader';
import { IconGavel, IconCalendarEvent, IconUsers } from '@tabler/icons-react';

const mockAuctions = [
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
  },
  {
    id: 'a3',
    name: 'Champions Cup 2026',
    status: 'UPCOMING',
    startTime: '2026-09-01T09:00:00Z',
    totalTeams: 16,
    teamsJoined: 4,
    type: 'Pro League',
    location: 'Online',
    startingPrice: 200000000,
    entryFee: 100000,
    logoBg: 'bg-purple-600 text-white',
    isWatchlisted: true
  },
  {
    id: 'a4',
    name: 'City Super League',
    status: 'COMPLETED',
    startTime: '2026-06-15T11:00:00Z',
    totalTeams: 10,
    teamsJoined: 10,
    type: 'Amateur',
    location: 'Chennai, India',
    startingPrice: 10000000,
    entryFee: 5000,
    logoBg: 'bg-orange-600 text-white',
    isWatchlisted: false
  }
];

const AuctionsList = () => {
  const [auctions, setAuctions] = useState(mockAuctions);
  const [searchQuery, setSearchQuery] = useState('');

  const handleWatchlistToggle = (id) => {
    setAuctions(auctions.map(a => 
      a.id === id ? { ...a, isWatchlisted: !a.isWatchlisted } : a
    ));
  };

  const filteredAuctions = auctions.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Hero Banner Section */}
      <div className="bg-[#111111] rounded-2xl overflow-hidden shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        {/* Placeholder background graphic */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/40 via-[#111111] to-[#111111]"></div>
        
        <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Explore <span className="text-[#f59e0b]">Auctions</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-8">
            Discover and participate in premium cricket leagues. Build your dream team with our state-of-the-art live auction system.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white">
              <IconGavel size={20} className="text-[#f59e0b]" />
              <span className="font-semibold">{mockAuctions.filter(a => a.status === 'LIVE').length} Live Now</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white">
              <IconCalendarEvent size={20} className="text-[#f59e0b]" />
              <span className="font-semibold">{mockAuctions.filter(a => a.status === 'UPCOMING').length} Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <PageHeader 
          title="All Auctions" 
          description="Browse and join available auctions" 
        />
        {/* Basic Search Filter placeholder */}
        <div className="w-full md:w-96 relative">
          <input 
            type="text" 
            placeholder="Search auctions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      {/* Grid of Auction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map(auction => (
            <AuctionCard 
              key={auction.id} 
              auction={auction} 
              onWatchlistToggle={handleWatchlistToggle}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            No auctions found matching your search criteria.
          </div>
        )}
      </div>

    </div>
  );
};

export default AuctionsList;
