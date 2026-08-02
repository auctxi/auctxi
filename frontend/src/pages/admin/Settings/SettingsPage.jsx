import React, { useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';
import { cn } from '../../../utils/cn';
import { 
  IconSettings, IconGavel, IconCreditCard, IconMail, 
  IconBell, IconShieldLock, IconServer, IconDatabase, 
  IconActivity, IconDeviceFloppy, IconUpload, IconTrash
} from '@tabler/icons-react';

const tabs = [
  { id: 'general', label: 'General', icon: <IconSettings size={20} /> },
  { id: 'auction', label: 'Auction', icon: <IconGavel size={20} /> },
  { id: 'payment', label: 'Payment', icon: <IconCreditCard size={20} /> },
  { id: 'email', label: 'Email', icon: <IconMail size={20} /> },
  { id: 'notification', label: 'Notification', icon: <IconBell size={20} /> },
  { id: 'security', label: 'Security', icon: <IconShieldLock size={20} /> },
  { id: 'system', label: 'System', icon: <IconServer size={20} /> },
  { id: 'backup', label: 'Backup & Restore', icon: <IconDatabase size={20} /> },
  { id: 'logs', label: 'Activity Logs', icon: <IconActivity size={20} /> }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [features, setFeatures] = useState({
    teamRegistration: true,
    playerRegistration: true,
    liveAuctions: true,
    publicViewing: false,
    maintenanceMode: false
  });

  const handleSave = () => {
    console.log('Saving settings...');
  };

  const handleToggle = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        subtitle="Manage system configurations and preferences"
        primaryAction={{ label: 'Save Changes', onClick: handleSave, icon: <IconDeviceFloppy size={18} /> }}
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeTab === tab.id 
                    ? "bg-black text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className={activeTab === tab.id ? "text-amber-500" : "text-gray-500"}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <>
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <p className="text-sm text-gray-500 mt-1">Update platform name, contact, and localization details.</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Platform Name</label>
                    <input type="text" defaultValue="AuctXI Platform" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tagline</label>
                    <input type="text" defaultValue="Premium Cricket Auction Management" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                    <input type="email" defaultValue="admin@auctxi.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>IST (Indian Standard Time)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Logo & Favicon */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Branding Assets</h3>
                </div>
                <div className="p-6 flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Platform Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <IconUpload className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-700">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Favicon</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <IconUpload className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-700">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">ICO, PNG (32x32px)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Feature Toggles</h3>
                  <p className="text-sm text-gray-500 mt-1">Enable or disable core platform features.</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Team Registration</h4>
                      <p className="text-sm text-gray-500">Allow new teams to register on the platform</p>
                    </div>
                    <ToggleSwitch 
                      checked={features.teamRegistration} 
                      onChange={() => handleToggle('teamRegistration')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Player Registration</h4>
                      <p className="text-sm text-gray-500">Allow new players to submit profiles</p>
                    </div>
                    <ToggleSwitch 
                      checked={features.playerRegistration} 
                      onChange={() => handleToggle('playerRegistration')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Live Auctions</h4>
                      <p className="text-sm text-gray-500">Enable real-time bidding system</p>
                    </div>
                    <ToggleSwitch 
                      checked={features.liveAuctions} 
                      onChange={() => handleToggle('liveAuctions')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Public Viewing</h4>
                      <p className="text-sm text-gray-500">Allow non-registered users to view auction results</p>
                    </div>
                    <ToggleSwitch 
                      checked={features.publicViewing} 
                      onChange={() => handleToggle('publicViewing')} 
                    />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <h4 className="text-sm font-medium text-red-600">Maintenance Mode</h4>
                      <p className="text-sm text-gray-500">Take the platform offline for updates</p>
                    </div>
                    <ToggleSwitch 
                      checked={features.maintenanceMode} 
                      onChange={() => handleToggle('maintenanceMode')} 
                    />
                  </div>
                </div>
              </div>

              {/* System Preferences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">System Preferences</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                      <option>USD ($)</option>
                      <option>INR (₹)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Items Per Page</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 flex flex-wrap gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <IconTrash size={16} /> Clear Cache
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <IconActivity size={16} /> System Health Check
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                    <IconDatabase size={16} /> Database Cleanup
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500 flex flex-col items-center">
              <IconSettings className="w-12 h-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
              <p>Configuration options for this module are coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
