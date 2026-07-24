import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { IconUsers, IconWallet, IconTrophy } from '@tabler/icons-react';

const MOCK_TEAMS = [
  { id: 1, name: 'Mumbai Indians', logo: 'MI', totalBudget: '100.0', spent: '75.5', remaining: '24.5', squadSize: 15, players: ['Rohit Sharma', 'Jasprit Bumrah', 'Suryakumar Yadav'] },
  { id: 2, name: 'Chennai Super Kings', logo: 'CSK', totalBudget: '100.0', spent: '82.0', remaining: '18.0', squadSize: 18, players: ['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad'] },
  { id: 3, name: 'Royal Challengers Bangalore', logo: 'RCB', totalBudget: '100.0', spent: '90.0', remaining: '10.0', squadSize: 16, players: ['Virat Kohli', 'Glenn Maxwell', 'Faf du Plessis'] },
  { id: 4, name: 'Delhi Capitals', logo: 'DC', totalBudget: '100.0', spent: '65.0', remaining: '35.0', squadSize: 12, players: ['Rishabh Pant', 'David Warner', 'Axar Patel'] },
];

export default function LiveTeams() {
  return (
    <div className="w-full">
      <PageHeader 
        title="Live Teams" 
        breadcrumbs={[{ label: 'Dashboard', path: '/manager' }, { label: 'Live Teams' }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {MOCK_TEAMS.map(team => (
          <Card key={team.id} className="flex flex-col overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-xl shadow-sm border border-amber-200">
                    {team.logo}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <IconUsers size={16} /> Squad: <span className="font-medium text-gray-700">{team.squadSize}/25</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider font-semibold">Total Purse</div>
                  <div className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                    <IconWallet size={18} className="text-gray-400" /> ₹{team.totalBudget} Cr
                  </div>
                </div>
                <div className="rounded-xl bg-red-50 p-4 text-center border border-red-100">
                  <div className="text-xs text-red-600 mb-1.5 uppercase tracking-wider font-semibold">Spent</div>
                  <div className="font-bold text-red-700 text-lg">
                    ₹{team.spent} Cr
                  </div>
                </div>
                <div className="rounded-xl bg-green-50 p-4 text-center border border-green-100">
                  <div className="text-xs text-green-600 mb-1.5 uppercase tracking-wider font-semibold">Remaining</div>
                  <div className="font-bold text-green-700 text-lg">
                    ₹{team.remaining} Cr
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <IconTrophy size={18} className="text-amber-500" /> Key Players
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {team.players.map((player, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                      {player}
                    </span>
                  ))}
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-500 border border-gray-200 border-dashed">
                    +{team.squadSize - team.players.length} more
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
