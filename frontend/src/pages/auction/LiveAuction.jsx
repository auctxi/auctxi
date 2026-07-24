import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { IconGavel, IconPlayerPlay, IconPlayerPause, IconCheck, IconCoins } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

const LiveAuction = () => {
  const [auction, setAuction] = useState(null);
  const [auctionId, setAuctionId] = useState(null); // Fetch from API dynamically
  const [bidAmount, setBidAmount] = useState(0);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Polling for live updates
  useEffect(() => {
    fetchTeams();
    const fetchLiveAuction = async () => {
      if (!auctionId) {
        try {
          const listRes = await api.get('/api/v1/auctions');
          if (listRes.data && listRes.data.content && listRes.data.content.length > 0) {
            setAuctionId(listRes.data.content[0].id);
          }
        } catch (err) {}
        return;
      }
      
      try {
        const res = await api.get(`/api/v1/auctions/${auctionId}`);
        setAuction(res.data);
      } catch (err) {
        // If 404, maybe we need to create it
      }
    };
    
    fetchLiveAuction();
    const interval = setInterval(fetchLiveAuction, 3000); // 3 sec polling
    return () => clearInterval(interval);
  }, [auctionId]);

  const fetchTeams = async () => {
    try {
      const res = await api.get('/api/v1/teams');
      setTeams(res.data);
    } catch (err) {}
  };

  const handleStateChange = async (action) => {
    try {
      await api.post(`/api/v1/auctions/${auctionId}/${action}`);
      toast.success(`Auction ${action} successful`);
    } catch (err) {}
  };

  const handlePlaceBid = async () => {
    if (!selectedTeam) return toast.error("Select a team");
    if (!bidAmount) return toast.error("Enter a bid amount");

    try {
      await api.post(`/api/v1/bidding/${auctionId}/players/${auction.currentPlayer.id}/bid`, {
        teamId: selectedTeam,
        amount: bidAmount
      });
      toast.success("Bid placed successfully!");
      setBidAmount(0);
    } catch (err) {}
  };

  const handleSellPlayer = async () => {
    try {
      await api.post(`/api/v1/bidding/${auctionId}/players/${auction.currentPlayer.id}/sell`);
      toast.success("Player Sold!");
      setIsSellModalOpen(false);
    } catch (err) {}
  };

  if (!auction) {
    return (
      <div className="flex h-96 flex-col items-center justify-center space-y-4">
        <IconGavel size={64} className="text-slate-300" />
        <h2 className="text-xl font-semibold text-slate-600">Waiting for Auction Data...</h2>
        <Button onClick={() => api.post('/api/v1/auctions', { name: "Season 1 Auction" }).then(res => setAuctionId(res.data.id))}>
          Create Initial Auction
        </Button>
      </div>
    );
  }

  const { status, currentPlayer, highestBid, winningTeamId, timerSeconds } = auction;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Live Auction Desk</h2>
          <div className="flex items-center gap-3 mt-1">
            <Badge variant={status === 'ONGOING' ? 'success' : status === 'PAUSED' ? 'warning' : 'default'}>
              {status}
            </Badge>
            <span className="text-sm font-medium text-slate-500">
              Timer: <span className="text-primary-600 font-mono text-lg">{timerSeconds != null ? timerSeconds + 's' : '-'}</span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {status !== 'COMPLETED' && (
            <>
              {status === 'UPCOMING' || status === 'PAUSED' ? (
                 <Button onClick={() => handleStateChange('start')} className="gap-2 bg-green-600 hover:bg-green-700 focus:ring-green-500">
                   <IconPlayerPlay size={18} /> Start
                 </Button>
              ) : (
                 <Button onClick={() => handleStateChange('pause')} className="gap-2 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500">
                   <IconPlayerPause size={18} /> Pause
                 </Button>
              )}
              <Button variant="danger" onClick={() => handleStateChange('end')} className="gap-2">
                <IconGavel size={18} /> End Auction
              </Button>
            </>
          )}
        </div>
      </div>

      {!currentPlayer ? (
        <Card className="flex h-64 flex-col items-center justify-center bg-slate-50/50">
          <IconUser size={48} className="text-slate-300 mb-4" />
          <h3 className="text-xl font-medium text-slate-600">No Player on the Block</h3>
          <p className="text-sm text-slate-500">Next player will appear here when ready.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Player Card */}
          <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg ring-1 ring-slate-200">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-semibold tracking-wider">
                {currentPlayer.category}
              </div>
              <h1 className="text-4xl font-black mb-2">{currentPlayer.name}</h1>
              <div className="flex items-center gap-4 text-primary-100">
                <span className="flex items-center gap-1"><IconRole size={18}/> {currentPlayer.role}</span>
                <span>•</span>
                <span>Base Price: ${currentPlayer.basePrice?.toLocaleString()}</span>
              </div>
            </div>
            
            <CardContent className="p-8 bg-white flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Current Highest Bid</p>
                <div className="text-6xl font-black text-slate-900 mb-2">
                  ${highestBid ? highestBid.toLocaleString() : currentPlayer.basePrice.toLocaleString()}
                </div>
                {winningTeamId ? (
                   <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-bold">
                     Winning Team ID: {winningTeamId}
                   </div>
                ) : (
                   <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-full font-medium">
                     No bids placed yet
                   </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bidding Terminal */}
          <Card className="bg-slate-50">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="flex items-center gap-2 text-primary-600"><IconCoins size={20}/> Terminal</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="space-y-4">
                <Select label="Select Bidding Team" value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
                  <option value="">-- Choose Team --</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name} (${t.remainingPurse?.toLocaleString()})</option>)}
                </Select>
                
                <Input 
                  label="Bid Amount ($)" 
                  type="number"
                  value={bidAmount}
                  onChange={e => setBidAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                
                <Button className="w-full h-12 text-lg" onClick={handlePlaceBid} disabled={status !== 'ONGOING'}>
                  Place Bid
                </Button>
              </div>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
                <div className="relative flex justify-center"><span className="bg-slate-50 px-2 text-sm text-slate-500">Admin Actions</span></div>
              </div>

              <Button variant="danger" className="w-full gap-2" onClick={() => setIsSellModalOpen(true)} disabled={!winningTeamId}>
                <IconCheck size={18} /> Sell Player
              </Button>

            </CardContent>
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} title="Confirm Sale">
        <p className="text-slate-600 mb-6">Are you absolutely sure you want to sell <strong>{currentPlayer?.name}</strong> to Team ID: <strong>{winningTeamId}</strong> for <strong>${highestBid?.toLocaleString()}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsSellModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleSellPlayer}>Confirm Sale</Button>
        </div>
      </Modal>

    </div>
  );
};

// Dummy icons for quick use since they might not be exported from tabler exactly as named above
import { IconUser, IconAward as IconRole } from '@tabler/icons-react';

export default LiveAuction;
