import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconAlertCircle, IconTemplate, IconPlus, IconCurrencyRupee, IconUsers, IconSettings, IconShieldCheck, IconArrowLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '../../../utils/cn';
import ruleTemplateService from '../../../services/ruleTemplateService';
import auctionsService from '../../../services/auctionsService';
import PageHeader from '../../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const STEPS = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Select Rules' },
  { id: 3, label: 'Review & Customize' }
];

const DEFAULT_RULES = {
  min_squad_size: 15,
  max_squad_size: 25,
  base_purse: 100000000,
  registration_mode: 'invite_only',
  allow_retaining: false,
  max_foreign_players: 8,
};

export default function AuctionCreate() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Step 1: Basic Info
  const [auctionName, setAuctionName] = useState('');
  
  // Step 2: Templates
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null); // 'scratch' or id
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Step 3: Rules
  const [rules, setRules] = useState({ ...DEFAULT_RULES });

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplateId === 'scratch') {
      setRules({ ...DEFAULT_RULES });
      setSelectedTemplate(null);
    } else if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        setSelectedTemplate(template);
        // Assuming template.rules contains the rule fields
        setRules({ ...DEFAULT_RULES, ...(template.rules || {}) });
      }
    }
  }, [selectedTemplateId, templates]);

  const fetchTemplates = async () => {
    try {
      setTemplatesLoading(true);
      const res = await ruleTemplateService.getAll();
      setTemplates(res.data || []);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      // Fallback or show error
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !auctionName.trim()) {
      setError('Auction name is required.');
      return;
    }
    if (currentStep === 2 && !selectedTemplateId) {
      setError('Please select a template or start from scratch.');
      return;
    }
    setError(null);
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        name: auctionName,
        rules: {
          ...rules,
          templateId: selectedTemplateId === 'scratch' ? null : selectedTemplateId
        }
      };
      
      await auctionsService.create(payload);
      navigate('/manager/dashboard');
    } catch (err) {
      console.error('Failed to create auction:', err);
      setError(err.response?.data?.message || 'Failed to create auction. Please try again.');
      setLoading(false);
    }
  };

  const handleRuleChange = (field, value) => {
    setRules(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isRuleChanged = (field) => {
    if (selectedTemplateId === 'scratch' || !selectedTemplate) return false;
    const originalValue = selectedTemplate.rules?.[field] ?? DEFAULT_RULES[field];
    return rules[field] !== originalValue;
  };

  const renderStepper = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                  currentStep > step.id ? "bg-green-500 text-white" :
                  currentStep === step.id ? "bg-amber-500 text-white ring-4 ring-amber-100" :
                  "bg-gray-100 text-gray-500"
                )}
              >
                {currentStep > step.id ? <IconCheck size={20} /> : step.id}
              </div>
              <span 
                className={cn(
                  "text-xs mt-2 font-medium",
                  currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div 
                className={cn(
                  "h-1 w-24 mx-4 rounded-full transition-colors",
                  currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <PageHeader 
        title="Create New Auction" 
        breadcrumbs={[
          { label: 'Dashboard', path: '/manager/dashboard' },
          { label: 'Auctions', path: '/manager/auctions' },
          { label: 'Create', path: '/manager/auctions/create' }
        ]}
      />

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <IconAlertCircle className="text-red-500 shrink-0" size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {renderStepper()}

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-8 min-h-[400px]">
          {currentStep === 1 && (
            <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
                <p className="text-gray-500">Give your auction a clear, recognizable name.</p>
              </div>
              <div className="space-y-6">
                <Input
                  label="Auction Name"
                  placeholder="e.g. Summer Premier League 2024"
                  value={auctionName}
                  onChange={(e) => setAuctionName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Rule Template</h2>
                <p className="text-gray-500">Select a predefined rule set or start from scratch.</p>
              </div>

              {templatesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-6 transition-all duration-200",
                        selectedTemplateId === template.id 
                          ? "border-amber-500 bg-amber-50/30 ring-2 ring-amber-500 shadow-md" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                          <IconTemplate size={24} />
                        </div>
                        {selectedTemplateId === template.id && (
                          <div className="bg-amber-500 text-white rounded-full p-1">
                            <IconCheck size={16} />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{template.description}</p>
                      
                      <div className="space-y-2 mt-auto">
                        <div className="flex items-center text-sm text-gray-600">
                          <IconUsers size={16} className="mr-2" />
                          Squad: {template.rules?.min_squad_size}-{template.rules?.max_squad_size}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <IconCurrencyRupee size={16} className="mr-2" />
                          Purse: {(template.rules?.base_purse / 10000000).toFixed(1)} Cr
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={() => setSelectedTemplateId('scratch')}
                    className={cn(
                      "cursor-pointer rounded-2xl border border-dashed p-6 transition-all duration-200 flex flex-col items-center justify-center text-center",
                      selectedTemplateId === 'scratch' 
                        ? "border-amber-500 bg-amber-50/30 ring-2 ring-amber-500 border-solid" 
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-full mb-4",
                      selectedTemplateId === 'scratch' ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"
                    )}>
                      <IconPlus size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Start from Scratch</h3>
                    <p className="text-sm text-gray-500">Define all your auction rules manually without a template.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Customize Rules</h2>
                <p className="text-gray-500">
                  {selectedTemplateId === 'scratch' 
                    ? "Set your auction rules." 
                    : `Customizing based on "${selectedTemplate?.name}" template.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                <div className="col-span-full mb-2 border-b pb-2">
                  <h3 className="text-lg font-semibold flex items-center text-gray-800">
                    <IconUsers className="mr-2" size={20} /> Squad Limits
                  </h3>
                </div>
                
                <div className="space-y-1">
                  <Input
                    label="Minimum Squad Size"
                    type="number"
                    value={rules.min_squad_size}
                    onChange={(e) => handleRuleChange('min_squad_size', parseInt(e.target.value) || 0)}
                    className={cn(isRuleChanged('min_squad_size') && "border-amber-300 bg-amber-50")}
                  />
                  {isRuleChanged('min_squad_size') && (
                    <p className="text-xs text-amber-600">Changed from {selectedTemplate?.rules?.min_squad_size}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="Maximum Squad Size"
                    type="number"
                    value={rules.max_squad_size}
                    onChange={(e) => handleRuleChange('max_squad_size', parseInt(e.target.value) || 0)}
                    className={cn(isRuleChanged('max_squad_size') && "border-amber-300 bg-amber-50")}
                  />
                  {isRuleChanged('max_squad_size') && (
                    <p className="text-xs text-amber-600">Changed from {selectedTemplate?.rules?.max_squad_size}</p>
                  )}
                </div>

                <div className="col-span-full mb-2 mt-4 border-b pb-2">
                  <h3 className="text-lg font-semibold flex items-center text-gray-800">
                    <IconCurrencyRupee className="mr-2" size={20} /> Financials
                  </h3>
                </div>

                <div className="space-y-1">
                  <Input
                    label="Base Purse (₹)"
                    type="number"
                    value={rules.base_purse}
                    onChange={(e) => handleRuleChange('base_purse', parseInt(e.target.value) || 0)}
                    className={cn(isRuleChanged('base_purse') && "border-amber-300 bg-amber-50")}
                  />
                   {isRuleChanged('base_purse') && (
                    <p className="text-xs text-amber-600">Changed from {selectedTemplate?.rules?.base_purse}</p>
                  )}
                </div>

                <div className="col-span-full mb-2 mt-4 border-b pb-2">
                  <h3 className="text-lg font-semibold flex items-center text-gray-800">
                    <IconSettings className="mr-2" size={20} /> Registration & Roster
                  </h3>
                </div>

                <div className="space-y-1">
                  <Select
                    label="Registration Mode"
                    options={[
                      { value: 'open', label: 'Open (Anyone can register)' },
                      { value: 'invite_only', label: 'Invite Only' }
                    ]}
                    value={rules.registration_mode}
                    onChange={(e) => handleRuleChange('registration_mode', e.target.value)}
                    className={cn(isRuleChanged('registration_mode') && "border-amber-300 bg-amber-50")}
                  />
                  {isRuleChanged('registration_mode') && (
                    <p className="text-xs text-amber-600">Changed from {selectedTemplate?.rules?.registration_mode}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="Max Foreign Players"
                    type="number"
                    value={rules.max_foreign_players}
                    onChange={(e) => handleRuleChange('max_foreign_players', parseInt(e.target.value) || 0)}
                    className={cn(isRuleChanged('max_foreign_players') && "border-amber-300 bg-amber-50")}
                  />
                  {isRuleChanged('max_foreign_players') && (
                    <p className="text-xs text-amber-600">Changed from {selectedTemplate?.rules?.max_foreign_players}</p>
                  )}
                </div>

                <div className="space-y-1 flex flex-col justify-center mt-6">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={rules.allow_retaining}
                        onChange={(e) => handleRuleChange('allow_retaining', e.target.checked)}
                      />
                      <div className={cn(
                        "block w-10 h-6 rounded-full transition-colors",
                        rules.allow_retaining ? "bg-amber-500" : "bg-gray-300",
                        isRuleChanged('allow_retaining') && "ring-2 ring-amber-300 ring-offset-1"
                      )}></div>
                      <div className={cn(
                        "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
                        rules.allow_retaining ? "transform translate-x-4" : ""
                      )}></div>
                    </div>
                    <div className="ml-3 font-medium text-gray-700">
                      Allow Player Retention
                    </div>
                  </label>
                  {isRuleChanged('allow_retaining') && (
                    <p className="text-xs text-amber-600 mt-1">Changed from template default</p>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || loading}
          >
            <IconArrowLeft size={18} className="mr-2" /> Back
          </Button>
          
          {currentStep < 3 ? (
            <Button
              variant="black"
              onClick={handleNext}
            >
              Next Step <IconChevronRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleCreate}
              loading={loading}
              disabled={loading}
            >
              Create Auction
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
