import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export default function UserCreate() {
  const navigate = useNavigate();

  const handleCancel = () => navigate('/admin/users');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/users');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader 
        title="Add New User" 
        backUrl="/admin/users"
      />

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                placeholder="Enter user's full name" 
                required 
              />
              <Input 
                type="email" 
                label="Email Address" 
                placeholder="Enter email address" 
                required 
              />
              <Input 
                type="password" 
                label="Password" 
                placeholder="Create a password" 
                required 
              />
              <Select 
                label="Role" 
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Auctioneer', value: 'auctioneer' },
                  { label: 'Team Owner', value: 'team_owner' },
                  { label: 'Viewer', value: 'viewer' }
                ]}
                placeholder="Select user role"
                required
              />
              <Select 
                label="Team Assignment (Optional)" 
                options={[
                  { label: 'Mumbai Indians', value: 'mi' },
                  { label: 'Chennai Super Kings', value: 'csk' },
                  { label: 'Royal Challengers Bangalore', value: 'rcb' },
                ]}
                placeholder="Select team"
              />
              <Select 
                label="Status" 
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Blocked', value: 'blocked' }
                ]}
                defaultValue="active"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" type="submit">Create User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
