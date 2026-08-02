import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import KPICardRow from '../../../components/ui/KPICardRow';
import DataTable from '../../../components/ui/DataTable';

const MOCK_TEAM = {
  id: '1',
  name: 'Chennai Super Kings',
  abbreviation: 'CSK',
  owner: 'India Cements',
  status: 'Active',
  budget: '₹ 100,00,00,000',
  purseRemaining: '₹ 25,50,00,000',
  players: 25,
};

const MOCK_ROSTER = [
  { id: 'p1', name: 'MS Dhoni', role: 'Wicketkeeper Batter', basePrice: '2.0 Cr', soldPrice: '12.0 Cr' },
  { id: 'p2', name: 'Ravindra Jadeja', role: 'All-rounder', basePrice: '2.0 Cr', soldPrice: '16.0 Cr' },
  { id: 'p3', name: 'Ruturaj Gaikwad', role: 'Batter', basePrice: '0.2 Cr', soldPrice: '6.0 Cr' },
];

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const kpis = [
    { title: 'Total Budget', value: MOCK_TEAM.budget },
    { title: 'Purse Remaining', value: MOCK_TEAM.purseRemaining },
    { title: 'Squad Size', value: MOCK_TEAM.players.toString() },
  ];

  const rosterColumns = [
    { key: 'name', header: 'Player Name' },
    { key: 'role', header: 'Role' },
    { key: 'basePrice', header: 'Base Price' },
    { key: 'soldPrice', header: 'Sold Price' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={MOCK_TEAM.name}
        description={`${MOCK_TEAM.abbreviation} • Owner: ${MOCK_TEAM.owner}`}
        backUrl="/admin/teams"
        primaryAction={{
          label: 'Edit Team',
          onClick: () => console.log('Edit team', id),
        }}
      />

      <KPICardRow kpis={kpis} />

      <Card title="Current Roster" subtitle="Players currently assigned to this team">
        <DataTable
          columns={rosterColumns}
          data={MOCK_ROSTER}
          keyExtractor={(item) => item.id}
        />
      </Card>
    </div>
  );
}
