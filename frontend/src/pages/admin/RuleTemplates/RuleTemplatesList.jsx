import React, { useState, useEffect } from 'react';
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconStarFilled, 
  IconTemplate,
  IconChecklist,
  IconClock,
  IconSettings,
  IconCurrencyRupee
} from '@tabler/icons-react';

import PageHeader from '../../../components/ui/PageHeader';
import KPICard from '../../../components/ui/KPICard';
import KPICardRow from '../../../components/ui/KPICardRow';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Modal } from '../../../components/common/Modal';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionMenu from '../../../components/ui/ActionMenu';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';
import ruleTemplateService from '../../../services/ruleTemplateService';
import { cn } from '../../../utils/cn';

const RuleTemplatesList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxSquadSize: 15,
    minSquadSize: 11,
    maxOverseasPlayers: 4,
    minBatsmen: 3,
    minBowlers: 3,
    minAllRounders: 1,
    minWicketKeepers: 1,
    initialPurse: 100000000,
    minBidAmount: 100000,
    bidIncrement: 50000,
    maxBid: 0,
    bidTimerSeconds: 30,
    autoSellTimeout: 10,
    allowUnsoldReentry: true,
    nominationMethod: 'RANDOM',
    maxParticipatingTeams: 8,
    registrationMode: 'OPEN',
    allowLateRegistration: false,
    allowOverseas: true,
    allowUncapped: true,
    allowRetired: true,
    allowManagerCreatedPlayers: false,
    isActive: true
  });

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await ruleTemplateService.getAll();
      setTemplates(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError('Failed to load rule templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggleChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const openNewModal = () => {
    setCurrentTemplate(null);
    setFormData({
      name: '',
      description: '',
      maxSquadSize: 15,
      minSquadSize: 11,
      maxOverseasPlayers: 4,
      minBatsmen: 3,
      minBowlers: 3,
      minAllRounders: 1,
      minWicketKeepers: 1,
      initialPurse: 100000000,
      minBidAmount: 100000,
      bidIncrement: 50000,
      maxBid: 0,
      bidTimerSeconds: 30,
      autoSellTimeout: 10,
      allowUnsoldReentry: true,
      nominationMethod: 'RANDOM',
      maxParticipatingTeams: 8,
      registrationMode: 'OPEN',
      allowLateRegistration: false,
      allowOverseas: true,
      allowUncapped: true,
      allowRetired: true,
      allowManagerCreatedPlayers: false,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (template) => {
    setCurrentTemplate(template);
    setFormData({
      ...template
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rule template?')) {
      try {
        await ruleTemplateService.delete(id);
        fetchTemplates();
      } catch (err) {
        console.error('Failed to delete template:', err);
        alert('Failed to delete template.');
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await ruleTemplateService.setDefault(id);
      fetchTemplates();
    } catch (err) {
      console.error('Failed to set default template:', err);
      alert('Failed to set default template.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    // Parse numeric values
    const numericFields = [
      'maxSquadSize', 'minSquadSize', 'maxOverseasPlayers', 
      'minBatsmen', 'minBowlers', 'minAllRounders', 'minWicketKeepers',
      'initialPurse', 'minBidAmount', 'bidIncrement', 'maxBid',
      'bidTimerSeconds', 'autoSellTimeout', 'maxParticipatingTeams'
    ];
    
    const payload = { ...formData };
    numericFields.forEach(field => {
      payload[field] = Number(payload[field]);
    });

    try {
      if (currentTemplate) {
        await ruleTemplateService.update(currentTemplate.id || currentTemplate._id, payload);
      } else {
        await ruleTemplateService.create(payload);
      }
      setIsModalOpen(false);
      fetchTemplates();
    } catch (err) {
      console.error('Failed to save template:', err);
      alert('Failed to save template. Please check the inputs.');
    } finally {
      setFormLoading(false);
    }
  };

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || 
                          (statusFilter === 'Active' && template.isActive) || 
                          (statusFilter === 'Inactive' && !template.isActive);
                          
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter(t => t.isActive).length;
  const defaultTemplate = templates.find(t => t.isDefault)?.name || 'None';
  // Mock total auctions using templates if not provided in API
  const totalAuctions = templates.reduce((acc, t) => acc + (t.usageCount || 0), 0);

  // Table columns
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (item) => (
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500 truncate max-w-[200px]">{item.description}</p>
        </div>
      )
    },
    {
      header: 'Max Squad Size',
      accessor: 'maxSquadSize',
    },
    {
      header: 'Initial Purse',
      accessor: 'initialPurse',
      render: (item) => `₹${(item.initialPurse / 10000000).toFixed(2)} Cr`
    },
    {
      header: 'Registration',
      accessor: 'registrationMode',
      render: (item) => (
        <Badge variant="outline">{item.registrationMode.replace('_', ' ')}</Badge>
      )
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (item) => (
        <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />
      )
    },
    {
      header: 'Default',
      accessor: 'isDefault',
      render: (item) => (
        item.isDefault ? 
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <IconStarFilled size={14} className="mr-1" /> Default
          </Badge> 
          : '-'
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <ActionMenu
          items={[
            {
              label: 'Edit',
              icon: IconEdit,
              onClick: () => openEditModal(item)
            },
            {
              label: 'Set as Default',
              icon: IconStarFilled,
              onClick: () => handleSetDefault(item.id || item._id),
              disabled: item.isDefault
            },
            {
              label: 'Delete',
              icon: IconTrash,
              onClick: () => handleDelete(item.id || item._id),
              danger: true,
              disabled: item.isDefault
            }
          ]}
        />
      )
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Rule Templates" 
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Rule Templates', path: '/admin/rule-templates' }
        ]}
        actionLabel="New Template"
        actionIcon={IconPlus}
        onAction={openNewModal}
      />
      
      {/* KPI Cards */}
      <KPICardRow>
        <KPICard
          title="Total Templates"
          value={totalTemplates.toString()}
          icon={IconTemplate}
          color="blue"
        />
        <KPICard
          title="Active Templates"
          value={activeTemplates.toString()}
          icon={IconChecklist}
          color="green"
        />
        <KPICard
          title="Default Template"
          value={defaultTemplate}
          icon={IconStarFilled}
          color="amber"
          valueClassName="text-lg truncate max-w-[150px]"
        />
        <KPICard
          title="Auctions Using Templates"
          value={totalAuctions.toString()}
          icon={IconSettings}
          color="purple"
        />
      </KPICardRow>
      
      {/* Search and Filters */}
      <SearchFilterBar
        searchPlaceholder="Search rule templates..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'All', label: 'All Status' },
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' }
            ],
            value: statusFilter,
            onChange: setStatusFilter
          }
        ]}
      />
      
      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredTemplates}
          keyExtractor={(item) => item.id || item._id}
          isLoading={loading}
          emptyTitle="No rule templates found"
          emptyDescription={searchTerm ? "Try adjusting your search or filters" : "Create your first rule template to get started"}
          emptyAction={{
            label: "Create Template",
            onClick: openNewModal
          }}
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentTemplate ? 'Edit Rule Template' : 'Create New Rule Template'}
        className="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="p-0">
          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Template Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Standard T20 Rules"
                />
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                    placeholder="Brief description of these rules..."
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Active Template</h4>
                    <p className="text-sm text-gray-500">Make this template available for new auctions</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.isActive}
                    onChange={() => handleToggleChange('isActive')}
                  />
                </div>
              </div>
            </div>

            {/* Team Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center">
                <IconChecklist size={20} className="mr-2 text-gray-400" />
                Team Composition Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Maximum Squad Size"
                  name="maxSquadSize"
                  value={formData.maxSquadSize}
                  onChange={handleInputChange}
                  min={11}
                  max={30}
                  required
                />
                <Input
                  type="number"
                  label="Minimum Squad Size"
                  name="minSquadSize"
                  value={formData.minSquadSize}
                  onChange={handleInputChange}
                  min={11}
                  max={20}
                  required
                />
                <Input
                  type="number"
                  label="Max Overseas Players"
                  name="maxOverseasPlayers"
                  value={formData.maxOverseasPlayers}
                  onChange={handleInputChange}
                  min={0}
                  max={10}
                  required
                />
                <Input
                  type="number"
                  label="Min Batsmen"
                  name="minBatsmen"
                  value={formData.minBatsmen}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Min Bowlers"
                  name="minBowlers"
                  value={formData.minBowlers}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Min All-Rounders"
                  name="minAllRounders"
                  value={formData.minAllRounders}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Min Wicket Keepers"
                  name="minWicketKeepers"
                  value={formData.minWicketKeepers}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>
            </div>

            {/* Financial Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center">
                <IconCurrencyRupee size={20} className="mr-2 text-gray-400" />
                Financial Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Initial Purse"
                  name="initialPurse"
                  value={formData.initialPurse}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Minimum Bid Amount"
                  name="minBidAmount"
                  value={formData.minBidAmount}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Bid Increment"
                  name="bidIncrement"
                  value={formData.bidIncrement}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
                <Input
                  type="number"
                  label="Maximum Bid (0 = No limit)"
                  name="maxBid"
                  value={formData.maxBid}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>
            </div>

            {/* Auction Runtime */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center">
                <IconClock size={20} className="mr-2 text-gray-400" />
                Auction Runtime
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  type="number"
                  label="Bid Timer (Seconds)"
                  name="bidTimerSeconds"
                  value={formData.bidTimerSeconds}
                  onChange={handleInputChange}
                  min={10}
                  max={120}
                  required
                />
                <Input
                  type="number"
                  label="Auto Sell Timeout (Seconds)"
                  name="autoSellTimeout"
                  value={formData.autoSellTimeout}
                  onChange={handleInputChange}
                  min={0}
                  max={60}
                  required
                />
                <Select
                  label="Nomination Method"
                  name="nominationMethod"
                  value={formData.nominationMethod}
                  onChange={handleInputChange}
                  options={[
                    { value: 'RANDOM', label: 'Random Selection' },
                    { value: 'SEQUENTIAL', label: 'Sequential (by Set)' },
                    { value: 'MANAGER_SELECTION', label: 'Manager Selection' }
                  ]}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Unsold Re-entry</h4>
                    <p className="text-sm text-gray-500">Can unsold players be brought back later?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowUnsoldReentry}
                    onChange={() => handleToggleChange('allowUnsoldReentry')}
                  />
                </div>
              </div>
            </div>

            {/* Registration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Registration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  type="number"
                  label="Max Participating Teams"
                  name="maxParticipatingTeams"
                  value={formData.maxParticipatingTeams}
                  onChange={handleInputChange}
                  min={2}
                  required
                />
                <Select
                  label="Registration Mode"
                  name="registrationMode"
                  value={formData.registrationMode}
                  onChange={handleInputChange}
                  options={[
                    { value: 'OPEN', label: 'Open Registration' },
                    { value: 'MANAGER_APPROVAL', label: 'Requires Manager Approval' },
                    { value: 'INVITE_ONLY', label: 'Invite Only' }
                  ]}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Late Registration</h4>
                    <p className="text-sm text-gray-500">Can teams register after auction has started?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowLateRegistration}
                    onChange={() => handleToggleChange('allowLateRegistration')}
                  />
                </div>
              </div>
            </div>

            {/* Player Eligibility */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Player Eligibility</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Overseas Players</h4>
                    <p className="text-sm text-gray-500">Can international players participate?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowOverseas}
                    onChange={() => handleToggleChange('allowOverseas')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Uncapped Players</h4>
                    <p className="text-sm text-gray-500">Can uncapped players participate?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowUncapped}
                    onChange={() => handleToggleChange('allowUncapped')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Retired Players</h4>
                    <p className="text-sm text-gray-500">Can retired players participate?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowRetired}
                    onChange={() => handleToggleChange('allowRetired')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Manager Created Players</h4>
                    <p className="text-sm text-gray-500">Can managers create custom players?</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.allowManagerCreatedPlayers}
                    onChange={() => handleToggleChange('allowManagerCreatedPlayers')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={formLoading}
            >
              {formLoading ? 'Saving...' : (currentTemplate ? 'Save Changes' : 'Create Template')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RuleTemplatesList;
