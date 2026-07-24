import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import RoleBadge from '../../components/ui/RoleBadge';
import { IconGavel, IconX, IconCurrencyRupee, IconHistory, IconUsersGroup } from '@tabler/icons-react';

/**
 * LiveAuction component - The core live auction management interface
 * @returns {JSX.Element}
 */
export default function LiveAuction() {
  const [currentBidValue, setCurrentBidValue] = useState('11.0');

  const currentPlayer = {
    name: 'Rohit Sharma',
    role: 'Batter',
    basePrice: '₹2.0 Cr',
    highestBid: '₹10.5 Cr',
    highestBidder: 'Mumbai Indians',
    stats: {
      matches: 243,
      runs: 6211,
      strikeRate: 130.0,
      average: 29.5
    },
    image: 'https://ui-avatars.com/api/?name=Rohit+Sharma&size=200&background=111111&color=F59E0B'
  };

  const activeTeams = [
    { id: 'MI', name: 'Mumbai Indians', purse: '₹30.5 Cr', color: 'bg-blue-600' },
    { id: 'CSK', name: 'Chennai Super Kings', purse: '₹45.0 Cr', color: 'bg-yellow-500' },
    { id: 'RCB', name: 'Royal Challengers Bangalore', purse: '₹22.0 Cr', color: 'bg-red-600' },
    { id: 'DC', name: 'Delhi Capitals', purse: '₹18.5 Cr', color: 'bg-blue-500' },
  ];

  const bidHistory = [
    { id: 1, team: 'Mumbai Indians', amount: '₹10.5 Cr', time: '10s ago' },
    { id: 2, team: 'Chennai Super Kings', amount: '₹10.0 Cr', time: '25s ago' },
    { id: 3, team: 'Mumbai Indians', amount: '₹9.5 Cr', time: '40s ago' },
    { id: 4, team: 'Chennai Super Kings', amount: '₹9.0 Cr', time: '1m ago' },
    { id: 5, team: 'Royal Challengers Bangalore', amount: '₹8.5 Cr', time: '1m 15s ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Live Auction Control"
          description="Manage the active auction, bids, and players in real-time."
        />
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Player Details & Bid Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Player Detail Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <img 
                    src={currentPlayer.image} 
                    alt={currentPlayer.name} 
                    className="w-32 h-32 md:w-48 md:h-48 rounded-xl object-cover border-4 border-gray-100 shadow-sm"
                  />
                </div>
                
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentPlayer.name}</h2>
                      <div className="mt-2">
                        <RoleBadge role={currentPlayer.role} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-medium mb-1">Base Price</p>
                      <Badge variant="secondary" className="text-lg py-1 px-3">
                        {currentPlayer.basePrice}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                    <div className="text-center md:text-left">
                      <p className="text-xs text-gray-500 font-medium">Matches</p>
                      <p className="text-lg font-semibold text-gray-900">{currentPlayer.stats.matches}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-gray-500 font-medium">Runs</p>
                      <p className="text-lg font-semibold text-gray-900">{currentPlayer.stats.runs}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-gray-500 font-medium">Strike Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{currentPlayer.stats.strikeRate}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-gray-500 font-medium">Average</p>
                      <p className="text-lg font-semibold text-gray-900">{currentPlayer.stats.average}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div>
                      <p className="text-sm font-medium text-amber-800">Current Highest Bid</p>
                      <p className="text-3xl font-bold text-amber-600">{currentPlayer.highestBid}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-800">Bidder</p>
                      <p className="text-lg font-bold text-gray-900">{currentPlayer.highestBidder}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bid Controls Card */}
          <Card>
            <CardHeader>
              <CardTitle>Bid Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* Manual Bid Input */}
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Enter Manual Bid (in Cr)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconCurrencyRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        step="0.5"
                        value={currentBidValue}
                        onChange={(e) => setCurrentBidValue(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="h-10 px-6">
                    Place Bid
                  </Button>
                </div>

                {/* Sell / Unsold Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <Button 
                    className="flex-1 h-14 text-lg bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    <IconGavel className="w-6 h-6 mr-2" />
                    SOLD TO MI AT {currentPlayer.highestBid}
                  </Button>
                  <Button 
                    variant="danger"
                    className="flex-1 h-14 text-lg font-bold"
                  >
                    <IconX className="w-6 h-6 mr-2" />
                    MARK UNSOLD
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>
          
        </div>

        {/* Right Column: Active Teams & Bid History */}
        <div className="space-y-6">
          
          {/* Active Teams Overview */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <IconUsersGroup className="w-5 h-5 text-gray-500" />
                <CardTitle className="text-base">Active Teams</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {activeTeams.map(team => (
                  <div key={team.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{team.id}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{team.purse}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bid History */}
          <Card className="flex-1">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconHistory className="w-5 h-5 text-gray-500" />
                  <CardTitle className="text-base">Bid History</CardTitle>
                </div>
                <Badge variant="secondary">{bidHistory.length} Bids</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="h-[350px] overflow-y-auto px-6 py-2">
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {bidHistory.map((bid, index) => (
                    <div key={bid.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline Dot */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${index === 0 ? 'bg-amber-500 text-white animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                        <IconCurrencyRupee className="w-5 h-5" />
                      </div>
                      
                      {/* Content Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold ${index === 0 ? 'text-amber-600 text-lg' : 'text-gray-900'}`}>{bid.amount}</span>
                          <span className="text-xs text-gray-500">{bid.time}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">{bid.team}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
