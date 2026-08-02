import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import RoleBadge from '../../../components/ui/RoleBadge';
import StatusBadge from '../../../components/ui/StatusBadge';

const MOCK_PLAYER = {
  id: '1',
  name: 'Virat Kohli',
  country: 'India',
  role: 'Batter',
  category: 'Capped',
  basePrice: '₹ 2,00,00,000',
  status: 'Sold',
  team: 'Royal Challengers Bangalore',
  soldPrice: '₹ 15,00,00,000',
  stats: {
    matches: 237,
    runs: 7263,
    average: 37.2,
    strikeRate: 130.0,
    hundreds: 7,
    fifties: 50,
  }
};

export default function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Player Profile"
        backUrl="/admin/players"
        primaryAction={{
          label: 'Edit Profile',
          onClick: () => console.log('Edit player', id),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
                {MOCK_PLAYER.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{MOCK_PLAYER.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{MOCK_PLAYER.country}</p>
              
              <div className="flex gap-2">
                <RoleBadge role={MOCK_PLAYER.role} />
                <StatusBadge status={MOCK_PLAYER.status === 'Sold' ? 'Completed' : 'Active'} label={MOCK_PLAYER.status} />
              </div>
            </div>
            
            <div className="pt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900">{MOCK_PLAYER.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Base Price</p>
                <p className="font-medium text-gray-900">{MOCK_PLAYER.basePrice}</p>
              </div>
              {MOCK_PLAYER.status === 'Sold' && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Current Team</p>
                    <p className="font-medium text-gray-900">{MOCK_PLAYER.team}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sold Price</p>
                    <p className="font-medium text-amber-600">{MOCK_PLAYER.soldPrice}</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Career Statistics">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Matches</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.matches}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Runs</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.runs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Batting Average</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.average}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Strike Rate</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.strikeRate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">100s</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.hundreds}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">50s</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PLAYER.stats.fifties}</p>
              </div>
            </div>
          </Card>

          <Card title="Auction History">
            <div className="text-center py-8 text-gray-500">
              <p>No previous auction history available.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
