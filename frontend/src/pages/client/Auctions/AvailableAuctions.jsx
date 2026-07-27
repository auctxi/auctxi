import React, { useState, useEffect } from 'react';
import { IconBuildingStore, IconCheck, IconX, IconClock } from '@tabler/icons-react';
import PageHeader from '../../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../../components/ui/Modal';
import auctionsService from '../../../services/auctionsService';
import applicationService from '../../../services/applicationService';
import { format } from 'date-fns';

const AvailableAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all auctions and current user's applications
      const [auctionsRes, appsRes] = await Promise.all([
        auctionsService.getAll(),
        applicationService.getMyApplications()
      ]);
      
      // Filter for UPCOMING or OPEN auctions (mock logic, adapt based on real status)
      const openAuctions = auctionsRes.data.filter(a => a.status === 'UPCOMING');
      setAuctions(openAuctions);
      setMyApplications(appsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationStatus = (auctionId) => {
    const app = myApplications.find(a => a.auction.id === auctionId);
    if (!app) return null;
    return app.status; // PENDING, APPROVED, REJECTED
  };

  const openApplyModal = (auction) => {
    setSelectedAuction(auction);
    setTeamName('');
    setLogoUrl('');
    setIsApplyModalOpen(true);
  };

  const handleApply = async () => {
    if (!teamName.trim()) return;
    setIsApplying(true);
    try {
      await applicationService.apply(selectedAuction.id, {
        teamName,
        logoUrl
      });
      setIsApplyModalOpen(false);
      fetchData(); // Refresh to show new application status
    } catch (error) {
      console.error("Application failed:", error);
      alert(error.response?.data?.message || "Failed to apply");
    } finally {
      setIsApplying(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800"><IconClock size={14}/> Pending Approval</span>;
      case 'APPROVED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800"><IconCheck size={14}/> Approved</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800"><IconX size={14}/> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Available Auctions" 
        subtitle="Discover and apply to participate in upcoming cricket leagues."
        icon={IconBuildingStore}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
        </div>
      ) : auctions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <IconBuildingStore size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Auctions Available</h3>
            <p className="mt-1 text-sm text-gray-500">There are no upcoming auctions open for registration at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction) => {
            const appStatus = getApplicationStatus(auction.id);
            
            return (
              <Card key={auction.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-[#111111]">{auction.name}</CardTitle>
                    {appStatus && renderStatusBadge(appStatus)}
                  </div>
                  <p className="text-sm text-gray-500">
                    Starts: {auction.startTime ? format(new Date(auction.startTime), 'MMM d, yyyy h:mm a') : 'TBA'}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-green-600">{auction.status}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t bg-gray-50/50">
                  {!appStatus ? (
                    <Button 
                      className="w-full" 
                      onClick={() => openApplyModal(auction)}
                    >
                      Apply to Participate
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      disabled
                    >
                      {appStatus === 'APPROVED' ? 'Registered' : 'Application Sent'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Apply for {selectedAuction?.name}</ModalTitle>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <p className="text-sm text-gray-600">
            Register your team to participate in this auction. If the auction requires manager approval, you will be notified once reviewed.
          </p>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Team Name *</label>
            <Input 
              placeholder="e.g. Mumbai Indians" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Logo URL (Optional)</label>
            <Input 
              placeholder="https://..." 
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
          <Button onClick={handleApply} disabled={!teamName.trim() || isApplying}>
            {isApplying ? 'Submitting...' : 'Submit Application'}
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default AvailableAuctions;
