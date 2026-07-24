import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function PlayerCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: 'Batter',
    category: 'Capped',
    basePrice: '',
    country: '',
    matches: '',
    runs: '',
    wickets: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting player:', formData);
    navigate('/admin/players');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Player"
        description="Register a new player for the auction pool."
        backUrl="/admin/players"
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Player Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="e.g., Virat Kohli"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="e.g., India"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
                >
                  <option value="Batter">Batter</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicketkeeper">Wicketkeeper</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
                >
                  <option value="Capped">Capped</option>
                  <option value="Uncapped">Uncapped</option>
                  <option value="Associate">Associate</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price (₹) *</label>
                <input
                  type="number"
                  id="basePrice"
                  name="basePrice"
                  required
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="e.g., 20000000"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Player Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="matches" className="block text-sm font-medium text-gray-700">Matches</label>
                <input
                  type="number"
                  id="matches"
                  name="matches"
                  value={formData.matches}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="runs" className="block text-sm font-medium text-gray-700">Runs</label>
                <input
                  type="number"
                  id="runs"
                  name="runs"
                  value={formData.runs}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="wickets" className="block text-sm font-medium text-gray-700">Wickets</label>
                <input
                  type="number"
                  id="wickets"
                  name="wickets"
                  value={formData.wickets}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/players')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Player
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
