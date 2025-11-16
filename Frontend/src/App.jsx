import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from '../Components/Navbar.jsx';
import Home from '../Pages/Home.jsx';
import Footer from '../Components/Footer.jsx';
import './App.css';
import OtpPage from '../Pages/OtpPage.jsx';
import ForgetPage from '../Pages/ForgetPage.jsx';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import TeamPage from './pages/TeamPage';
import MentorsPage from './pages/MentorsPage';
import FaqPage from './pages/FaqPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children ? children : <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ height: `var(--navbar-height, 90px)` }} className="w-full"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp-verify" element={<OtpPage />} />
            <Route path="/forgot-password" element={<ForgetPage />} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/otp-verification" element={<OtpPage />} />
            <Route path="/forgot-password" element={<ForgetPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Add your protected routes here */}
            {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
