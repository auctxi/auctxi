import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IconUsers, IconUserPlus, IconCheck, IconX, IconClock, IconBuildingStore } from '@tabler/icons-react';
import PageHeader from '../../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import applicationService from '../../../services/applicationService';
import auctionsService from '../../../services/auctionsService';
import { format } from 'date-fns';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [auctionRes, appsRes] = await Promise.all([
        auctionsService.getById(id),
        applicationService.getByAuction(id)
      ]);
      setAuction(auctionRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      console.error("Failed to fetch auction details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (appId) => {
    try {
      await applicationService.approve(appId);
      fetchData(); // refresh list
    } catch (error) {
      alert("Failed to approve application");
    }
  };

  const handleReject = async (appId) => {
    try {
      await applicationService.reject(appId);
      fetchData(); // refresh list
    } catch (error) {
      alert("Failed to reject application");
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800"><IconClock size={14}/> PENDING</span>;
      case 'APPROVED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800"><IconCheck size={14}/> APPROVED</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800"><IconX size={14}/> REJECTED</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const applicationColumns = [
    { key: "id", label: "ID", render: (item) => <span className="text-gray-500 text-xs">{item.id.substring(0,8)}...</span> },
    { key: "clientName", label: "Client", render: (item) => <span className="font-medium text-gray-900">{item.client?.name || 'Unknown'}</span> },
    { key: "teamName", label: "Team Name", render: (item) => <span className="font-semibold">{item.team?.name || 'N/A'}</span> },
    { key: "status", label: "Status", render: (item) => renderStatusBadge(item.status) },
    { key: "appliedAt", label: "Applied On", render: (item) => item.appliedAt ? format(new Date(item.appliedAt), 'MMM d, yyyy') : '-' },
    { key: "actions", label: "Actions", render: (item) => (
        item.status === 'PENDING' ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleApprove(item.id)} className="bg-green-600 hover:bg-green-700">Approve</Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(item.id)}>Reject</Button>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Processed</span>
        )
      ) 
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!auction) {
    return <div>Auction not found.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={auction.name} 
        subtitle="Manage this auction's rules, applications, and invitations."
        icon={IconBuildingStore}
      />

      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
            activeTab === 'applications'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          <IconUsers size={18} />
          Applications
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
            activeTab === 'invitations'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          <IconUserPlus size={18} />
          Invitations
        </button>
      </div>

      {activeTab === 'applications' && (
        <Card>
          <CardHeader>
            <CardTitle>Team Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <DataTable columns={applicationColumns} data={applications} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No applications have been submitted for this auction yet.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'invitations' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sent Invitations</CardTitle>
            <Button size="sm"><IconUserPlus size={16} className="mr-2"/> Invite Client</Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              Invitations feature is coming soon.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuctionDetails;
