import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconBuildingStore, IconPlus, IconSettings } from '@tabler/icons-react';
import PageHeader from '../../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import auctionsService from '../../../services/auctionsService';
import { format } from 'date-fns';

const ManagerAuctionsList = () => {
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await auctionsService.getAll();
      setAuctions(res.data);
    } catch (error) {
      console.error("Failed to fetch auctions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="My Auctions" 
          subtitle="Manage your auctions, rules, and participating teams."
          icon={IconBuildingStore}
        />
        <Link to="/manager/auctions/create">
          <Button className="flex items-center gap-2">
            <IconPlus size={18} />
            Create Auction
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
        </div>
      ) : auctions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <IconBuildingStore size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Auctions Found</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't created any auctions yet.</p>
            <Link to="/manager/auctions/create" className="mt-4 inline-block">
              <Button>Create Your First Auction</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction) => (
            <Card key={auction.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-[#111111]">{auction.name}</CardTitle>
                </div>
                <p className="text-sm text-gray-500">
                  Starts: {auction.startTime ? format(new Date(auction.startTime), 'MMM d, yyyy h:mm a') : 'TBA'}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-medium ${auction.status === 'UPCOMING' ? 'text-amber-600' : 'text-green-600'}`}>
                      {auction.status}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t bg-gray-50/50">
                <Link to={`/manager/auctions/${auction.id}`} className="w-full">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" variant="black">
                    <IconSettings size={18} className="mr-2" />
                    Manage
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerAuctionsList;
