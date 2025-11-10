import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx'
import Home from '../Pages/Home.jsx'
import Login from '../Pages/Login.jsx'
import Footer from '../Components/Footer.jsx';
import './App.css'
import Register from '../Pages/Register.jsx';
import OtpPage from '../Pages/OtpPage.jsx';
import ForgetPage from '../Pages/ForgetPage.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      {/* Navbar Spacer - This prevents content overlap */}
      <div style={{ height: `var(--navbar-height, 90px)` }} className="w-full"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/otp-varification" element={<OtpPage/>} />
        <Route path="/forget-password" element={<ForgetPage/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App
