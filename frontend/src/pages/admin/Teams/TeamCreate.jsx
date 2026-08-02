import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function TeamCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    owner: '',
    status: 'Active',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting team:', formData);
    navigate('/admin/teams');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Team"
        description="Create a new team for the auction."
        backUrl="/admin/teams"
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Team Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="e.g., Chennai Super Kings"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="abbreviation" className="block text-sm font-medium text-gray-700">Abbreviation *</label>
              <input
                type="text"
                id="abbreviation"
                name="abbreviation"
                required
                value={formData.abbreviation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="e.g., CSK"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner/Representative</label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Name of owner"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Total Budget *</label>
              <input
                type="number"
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="e.g., 100000000"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/teams')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Team
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
