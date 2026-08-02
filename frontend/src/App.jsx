/**
 * EXECUTION FLOW STEP 3: The Central Router
 * ---------------------------------------------------------
 * This component acts as the "Traffic Controller" for the entire application.
 * When a user navigates to a URL (e.g., /admin/players), this file determines
 * which UI components should be rendered based on the path and the user's role.
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ClientLayout from './layouts/ClientLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const PlayersList = lazy(() => import('./pages/admin/Players/PlayersList'));
const RuleTemplatesList = lazy(() => import('./pages/admin/RuleTemplates/RuleTemplatesList'));

// Lazy-loaded Manager Pages
const ManagerDashboard = lazy(() => import('./pages/manager/ManagerDashboard'));
const ManagerAuctionsList = lazy(() => import('./pages/manager/Auctions/ManagerAuctionsList'));
const ManagerAuctionCreate = lazy(() => import('./pages/manager/Auctions/AuctionCreate'));
const AuctionDetails = lazy(() => import('./pages/manager/Auctions/AuctionDetails'));
const LiveAuction = lazy(() => import('./pages/manager/LiveAuction'));
const LiveTeams = lazy(() => import('./pages/manager/LiveTeams'));

// Lazy-loaded Client Pages
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'));
const AvailableAuctions = lazy(() => import('./pages/client/Auctions/AvailableAuctions'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
      <span className="text-sm text-gray-500">Loading...</span>
    </div>
  </div>
);

// Placeholder component for pages not yet built
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
      <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-gray-900">{title || 'Coming Soon'}</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-md">This page is under construction and will be available soon.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin & Manager Layout (Sidebar) */}
          <Route element={<DashboardLayout />}>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Player Management (shared component, backend enforces visibility) */}
              <Route path="/admin/players" element={<PlayersList />} />
              
              {/* Rule Templates (Admin only) */}
              <Route path="/admin/rule-templates" element={<RuleTemplatesList />} />
              
              {/* Placeholder pages for features not yet built */}
              <Route path="/admin/auctions" element={<ComingSoon title="Auctions Management" />} />
              <Route path="/admin/teams" element={<ComingSoon title="Teams Management" />} />
              <Route path="/admin/users" element={<ComingSoon title="Users Management" />} />
              <Route path="/admin/bids" element={<ComingSoon title="Bids History" />} />
              <Route path="/admin/payments" element={<ComingSoon title="Payments" />} />
              <Route path="/admin/reports" element={<ComingSoon title="Reports" />} />
              <Route path="/admin/notifications" element={<ComingSoon title="Notifications" />} />
              <Route path="/admin/settings" element={<ComingSoon title="Settings" />} />
              <Route path="/admin/support" element={<ComingSoon title="Support" />} />
              <Route path="/admin/profile" element={<ComingSoon title="Profile" />} />
            </Route>

            {/* Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_MANAGER']} />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/auctions" element={<ManagerAuctionsList />} />
              <Route path="/manager/auctions/create" element={<ManagerAuctionCreate />} />
              <Route path="/manager/auctions/:id" element={<AuctionDetails />} />
              <Route path="/manager/players" element={<PlayersList />} />
              <Route path="/manager/live-auction" element={<LiveAuction />} />
              <Route path="/manager/live-teams" element={<LiveTeams />} />
            </Route>

          </Route>

          {/* Client Layout (Top Nav) */}
          <Route element={<ClientLayout />}>
            <Route element={<ProtectedRoute allowedRoles={['ROLE_CLIENT']} />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/auctions" element={<AvailableAuctions />} />
              <Route path="/client/player-pool" element={<ComingSoon title="Player Pool" />} />
              <Route path="/client/payments" element={<ComingSoon title="Payments" />} />
              <Route path="/client/profile" element={<ComingSoon title="Profile" />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;