import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import KPICardRow from '../../../components/ui/KPICardRow';
import KPICard from '../../../components/ui/KPICard';
import Card, { CardContent } from '../../../components/ui/Card';
import StatusBadge from '../../../components/ui/StatusBadge';
import { IconUsers, IconUser, IconCoin, IconGavel } from '@tabler/icons-react';

const mockAuction = {
  id: '1',
  name: 'IPL 2026 Mega Auction',
  type: 'Mega Auction',
  status: 'upcoming',
  date: 'Aug 15, 2026',
  teams: 10,
  players: 450,
  purse: '₹100 Cr',
  totalBids: 0
};

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'teams', label: 'Teams' },
  { id: 'players', label: 'Player Pool' },
  { id: 'bids', label: 'Bids History' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'logs', label: 'System Logs' },
  { id: 'settings', label: 'Settings' }
];

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const breadcrumbs = [
    { label: 'Auctions', href: '/admin/auctions' },
    { label: mockAuction.name }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <PageHeader 
          title={mockAuction.name}
          breadcrumbs={breadcrumbs}
        />
        <div className="flex items-center gap-3">
          <StatusBadge status={mockAuction.status} />
          <div className="text-sm text-gray-500 font-medium">
            {mockAuction.type} • {mockAuction.date}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content Placeholder */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <KPICardRow>
              <KPICard
                title="Registered Teams"
                value={mockAuction.teams.toString()}
                icon={<IconUsers className="w-5 h-5 text-blue-500" />}
              />
              <KPICard
                title="Player Pool"
                value={mockAuction.players.toString()}
                icon={<IconUser className="w-5 h-5 text-indigo-500" />}
              />
              <KPICard
                title="Total Purse / Team"
                value={mockAuction.purse}
                icon={<IconCoin className="w-5 h-5 text-amber-500" />}
              />
              <KPICard
                title="Total Bids"
                value={mockAuction.totalBids.toString()}
                icon={<IconGavel className="w-5 h-5 text-emerald-500" />}
              />
            </KPICardRow>
            
            <Card>
              <CardContent className="p-12 flex items-center justify-center text-gray-500 flex-col gap-4">
                <IconGavel className="w-12 h-12 text-gray-300" />
                <p>Auction Overview Dashboard - Coming Soon</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab !== 'overview' && (
          <Card>
            <CardContent className="p-12 flex items-center justify-center text-gray-500 flex-col gap-4">
              <p>{tabs.find(t => t.id === activeTab)?.label} - Component under construction</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;
