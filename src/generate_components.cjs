const fs = require('fs');
const path = require('path');

const dirs = [
    'pages/public',
    'pages/auth',
    'pages/dashboard',
    'pages/builder',
    'components/layout',
    'components/ui',
    'components/cv'
];

dirs.forEach(dir => fs.mkdirSync(path.join(__dirname, dir), { recursive: true }));

const files = {
    'pages/public/Home.jsx': 'export default function Home() { return <div>Home</div>; }',
    'pages/public/About.jsx': 'export default function About() { return <div>About Us</div>; }',
    'pages/public/Contact.jsx': 'export default function Contact() { return <div>Contact Us</div>; }',
    'pages/public/Chatbot.jsx': 'export default function Chatbot() { return <div>Chatbot</div>; }',
    'pages/auth/Login.jsx': 'export default function Login() { return <div>Login</div>; }',
    'pages/auth/Register.jsx': 'export default function Register() { return <div>Register</div>; }',
    'pages/dashboard/Dashboard.jsx': 'export default function Dashboard() { return <div>Dashboard</div>; }',
    'pages/dashboard/Settings.jsx': 'export default function Settings() { return <div>Settings</div>; }',
    'pages/dashboard/Templates.jsx': 'export default function Templates() { return <div>Templates</div>; }',
    'pages/builder/BuilderLayout.jsx': 'import { Outlet } from "react-router-dom"; export default function BuilderLayout() { return <div><div>Builder Layout</div><Outlet /></div>; }',
    'pages/builder/Step1.jsx': 'export default function Step1() { return <div>Step 1: Personal Info</div>; }',
    'pages/builder/Step2.jsx': 'export default function Step2() { return <div>Step 2: Experience & Skills</div>; }',
    'pages/builder/Step3.jsx': 'export default function Step3() { return <div>Step 3: Preview</div>; }',
    'components/layout/MainLayout.jsx': 'import { Outlet } from "react-router-dom"; export default function MainLayout() { return <div><nav>Navbar</nav><main><Outlet /></main></div>; }',
    'routes/ProtectedRoute.jsx': 'import { Navigate, Outlet } from "react-router-dom"; import { useAuth } from "../context/AuthContext"; export default function ProtectedRoute() { const { user, loading } = useAuth(); if (loading) return <div>Loading...</div>; return user ? <Outlet /> : <Navigate to="/login" replace />; }'
};

Object.entries(files).forEach(([file, content]) => {
    fs.writeFileSync(path.join(__dirname, file), content);
});

console.log('Dummy files generated successfully!');
