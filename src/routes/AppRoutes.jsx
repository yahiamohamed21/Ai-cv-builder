import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Chatbot from '../pages/public/Chatbot';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard / Builder
import Dashboard from '../pages/dashboard/Dashboard';
import Settings from '../pages/dashboard/Settings';
import Templates from '../pages/dashboard/Templates';
import BuilderLayout from '../pages/builder/BuilderLayout';
import Step1 from '../pages/builder/Step1';
import Step2 from '../pages/builder/Step2';
import Step3 from '../pages/builder/Step3';
import Step4 from '../pages/builder/Step4';

// CV Details
import CVDetails from '../components/cv/CVDetails';

// Layout
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/admin/AdminLayout';

// Admin Pages
import AdminOverview from '../pages/admin/AdminOverview';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminTemplates from '../pages/admin/AdminTemplates';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminSubscriptions from '../pages/admin/AdminSubscriptions';
import AdminSettings from '../pages/admin/AdminSettings';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Route (Custom Layout) */}
                <Route path="/" element={<Home />} />

                {/* Info & Auth Routes (Full Width) */}
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chatbot" element={<Chatbot />} />

                {/* Public Routes with MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/contact" element={<Contact />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route element={<MainLayout />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/templates" element={<Templates />} />
                    </Route>

                    {/* Builder Routes (no main layout or custom builder layout) */}
                    <Route path="/builder" element={<BuilderLayout />}>
                        <Route index element={<Navigate to="step1" replace />} />
                        <Route path="step1" element={<Step1 />} />
                        <Route path="step2" element={<Step2 />} />
                        <Route path="step3" element={<Step3 />} />
                        <Route path="step4" element={<Step4 />} />
                    </Route>

                    {/* CV Details */}
                    <Route path="/cv/:id" element={<CVDetails />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="templates" element={<AdminTemplates />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="subscriptions" element={<AdminSubscriptions />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
