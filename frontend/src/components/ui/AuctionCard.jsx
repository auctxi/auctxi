import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { IconCalendarEvent, IconClock, IconMapPin, IconUsers, IconHeart, IconHeartFilled, IconGavel } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const AuctionCard = ({ auction, onWatchlistToggle }) => {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  // Mocks if backend data is missing
  const maxTeams = auction.totalTeams || 16;
  const teamsJoined = auction.teamsJoined || 0;
  const logoBg = auction.logoBg || 'bg-amber-100 text-amber-800';
  const type = auction.type || 'League Auction';
  const location = auction.location || 'Online';
  const startingPrice = auction.startingPrice || 0;
  const entryFee = auction.entryFee || 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(amount);
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0 flex flex-col flex-grow">
        
        {/* Banner Image / Logo Area */}
        <div className={`h-24 w-full rounded-t-2xl relative ${logoBg} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <span className="text-3xl font-black uppercase text-center relative z-10 shadow-sm opacity-90 mix-blend-overlay">
            {auction.name.substring(0, 3)}
          </span>
          <div className="absolute top-3 right-3 z-20">
            <button 
              onClick={() => onWatchlistToggle?.(auction.id)}
              className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500 transition-colors"
            >
              {auction.isWatchlisted ? <IconHeartFilled size={18} className="text-red-500" /> : <IconHeart size={18} />}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{auction.name}</h3>
              <p className="text-xs font-medium text-[#f59e0b] uppercase tracking-wider">{type}</p>
            </div>
            <Badge variant={auction.status === 'LIVE' ? 'success' : auction.status === 'UPCOMING' ? 'warning' : 'default'}>
              {auction.status || 'UNKNOWN'}
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <IconCalendarEvent size={16} className="text-gray-400" />
              <span>{formatDate(auction.startTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconClock size={16} className="text-gray-400" />
              <span>{formatTime(auction.startTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconMapPin size={16} className="text-gray-400" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconUsers size={16} className="text-gray-400" />
              <span>{teamsJoined} / {maxTeams} Teams</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500 uppercase">Starting Purse</p>
              <p className="font-bold text-gray-900">{formatCurrency(startingPrice)}</p>
            </div>
            {entryFee > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase">Entry Fee</p>
                <p className="font-bold text-gray-900">{formatCurrency(entryFee)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 pt-0 mt-auto grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => navigate(`/client/auction/${auction.id}`)}>
            View Details
          </Button>
          <Button 
            variant={joined ? "outline" : "black"} 
            className={joined ? "border-green-500 text-green-700 bg-green-50 hover:bg-green-100" : ""}
            onClick={() => {
              if (joined) {
                toast.info("You have already joined this auction.");
              } else {
                setJoined(true);
                toast.success("Successfully joined the auction!");
              }
            }}
          >
            {joined ? "Joined" : "Join Auction"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionCard;
// Vite HMR Refresh
