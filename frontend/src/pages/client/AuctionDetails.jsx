import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { IconInfoCircle, IconUsers, IconGavel, IconList, IconTrophy, IconClock, IconMapPin, IconCoinRupee } from '@tabler/icons-react';
import { cn } from '../../utils/cn';

const mockAuctionData = {
  id: 'a1',
  name: 'Premier Corporate League 2026',
  status: 'LIVE',
  startTime: '2026-07-25T10:00:00Z',
  totalTeams: 8,
  teamsJoined: 8,
  type: 'Corporate',
  location: 'Mumbai, India',
  startingPrice: 100000000,
  rules: [
    "Base price for category A is ₹10L",
    "Maximum 15 players per squad",
    "Minimum 2 overseas players",
    "Right to match (RTM) card limit: 1"
  ]
};

const AuctionDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const auction = mockAuctionData; // In real app, fetch by id

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <IconInfoCircle size={18} /> },
    { id: 'squad', label: 'My Squad', icon: <IconUsers size={18} /> },
    { id: 'live', label: 'Live Bid', icon: <IconGavel size={18} /> },
    { id: 'rules', label: 'Rules', icon: <IconList size={18} /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <IconTrophy size={18} /> }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auction Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                        <IconClock size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Start Time</p>
                        <p className="text-sm font-semibold text-gray-900">25 Jul 2026, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                        <IconMapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Location</p>
                        <p className="text-sm font-semibold text-gray-900">{auction.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                        <IconUsers size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Teams</p>
                        <p className="text-sm font-semibold text-gray-900">{auction.teamsJoined} / {auction.totalTeams} Joined</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                        <IconCoinRupee size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Base Purse</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(auction.startingPrice)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Rules</h3>
                    <ul className="space-y-2">
                      {auction.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1 w-1.5 h-1.5 bg-[#f59e0b] rounded-full flex-shrink-0"></span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="black" className="w-full justify-center" onClick={() => setActiveTab('live')}>
                    Enter Live Auction
                  </Button>
                  <Button variant="outline" className="w-full justify-center" onClick={() => setActiveTab('squad')}>
                    Manage Squad
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'squad':
        return (
          <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in">
            <IconUsers size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900">My Squad</h3>
            <p className="max-w-md mx-auto mt-2">Your team roster and remaining purse details will appear here.</p>
          </div>
        );

      case 'live':
        return (
          <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in">
            <IconGavel size={48} className="mx-auto mb-4 text-[#f59e0b]" />
            <h3 className="text-lg font-semibold text-gray-900">Live Bid Room</h3>
            <p className="max-w-md mx-auto mt-2">The real-time bidding interface is currently under construction for this phase.</p>
          </div>
        );

      case 'rules':
        return (
          <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in">
            <IconList size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900">Auction Rules</h3>
            <p className="max-w-md mx-auto mt-2">Comprehensive rulebook and guidelines for participants.</p>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in">
            <IconTrophy size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
            <p className="max-w-md mx-auto mt-2">Current standings, top bids, and team budget rankings.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-gray-50 opacity-50">
          <IconTrophy size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={auction.status === 'LIVE' ? 'success' : 'default'} className="uppercase">
              {auction.status}
            </Badge>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {auction.type}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{auction.name}</h1>
        </div>
        
        <div className="relative z-10 text-left md:text-right">
          <p className="text-sm text-gray-500 font-medium">Starting On</p>
          <p className="text-lg font-semibold text-gray-900">25 Jul 2026, 10:00 AM</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === tab.id 
                  ? "bg-[#111111] text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="mt-6">
        {renderTabContent()}
      </div>

    </div>
  );
};

export default AuctionDetails;
