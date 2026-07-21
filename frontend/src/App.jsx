// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";

import { ROUTES } from "./constants/routes"; // <-- Update path if required

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              Public Routes
          ========================== */}

          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* =========================
              Admin Routes
          ========================== */}

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<DashboardLayout />}>

              <Route
                path={ROUTES.ADMIN_DASHBOARD}
                element={<AdminDashboard />}
              />

              {/* Future Admin Pages */}

              {/* <Route path={ROUTES.ADMIN_AUCTIONS} element={<AdminAuctions />} /> */}
              {/* <Route path={ROUTES.ADMIN_PLAYERS} element={<AdminPlayers />} /> */}
              {/* <Route path={ROUTES.ADMIN_TEAMS} element={<AdminTeams />} /> */}
              {/* <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} /> */}
              {/* <Route path={ROUTES.ADMIN_PAYMENTS} element={<AdminPayments />} /> */}
              {/* <Route path={ROUTES.ADMIN_REPORTS} element={<AdminReports />} /> */}
              {/* <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} /> */}

            </Route>
          </Route>

          {/* =========================
              Manager Routes
          ========================== */}

          <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
            <Route element={<DashboardLayout />}>

              <Route
                path={ROUTES.MANAGER_DASHBOARD}
                element={<ManagerDashboard />}
              />

              {/* Future Manager Pages */}

              {/* <Route path={ROUTES.MANAGER_AUCTIONS} element={<ManagerAuctions />} /> */}
              {/* <Route path={ROUTES.MANAGER_PLAYERS} element={<ManagerPlayers />} /> */}
              {/* <Route path={ROUTES.MANAGER_PAYMENTS} element={<ManagerPayments />} /> */}
              {/* <Route path={ROUTES.MANAGER_REPORTS} element={<ManagerReports />} /> */}

            </Route>
          </Route>

          {/* =========================
              Client Routes
          ========================== */}

          <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
            <Route element={<DashboardLayout />}>

              <Route
                path={ROUTES.CLIENT_DASHBOARD}
                element={<ClientDashboard />}
              />

              {/* Future Client Pages */}

              {/* <Route path={ROUTES.CLIENT_AUCTIONS} element={<ClientAuctions />} /> */}
              {/* <Route path={ROUTES.CLIENT_PLAYERS} element={<ClientPlayers />} /> */}
              {/* <Route path={ROUTES.CLIENT_PAYMENTS} element={<ClientPayments />} /> */}
              {/* <Route path={ROUTES.CLIENT_PROFILE} element={<ClientProfile />} /> */}

            </Route>
          </Route>

          {/* =========================
              Default Route
          ========================== */}

          <Route
            path="*"
            element={<Navigate to={ROUTES.LOGIN} replace />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;