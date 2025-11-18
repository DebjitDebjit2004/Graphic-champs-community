import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaVenusMars, 
  FaCalendarAlt,
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaGithub
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../contexts/AuthContext';

const RegisterForm = ({ isMobile = false }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const validateStepOne = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStepTwo = () => {
    const newErrors = {};
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dob);
      const today = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(today.getFullYear() - 13);
      
      if (dob > minAgeDate) {
        newErrors.dob = 'You must be at least 13 years old';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStepThree = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Must include uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && validateStepOne()) {
      setStep(2);
    } else if (step === 2 && validateStepTwo()) {
      setStep(3);
    }
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStepThree()) {
      // Scroll to the first error if there are any
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        password: formData.password
      };
      
      const result = await register(userData);
      
      if (result.success || result.token) {  // Check for both success flag and token
        toast.success('Registration successful! Please verify your email.');
        navigate('/otp-verification', { 
          state: { 
            email: formData.email,
            from: 'register'  // Indicate this is a new registration
          } 
        });
      } else {
        throw new Error(result.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialRegister = (provider) => {
    toast.info(`Sign up with ${provider} coming soon!`);
    // Implement social registration logic here
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(100, strength);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Step 1: Basic Information
  const renderStepOne = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
      <p className="text-gray-600 mb-6">Join our creative community today</p>
      
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </>
  );

  // Step 2: Additional Information
  const renderStepTwo = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us More</h2>
      <p className="text-gray-600 mb-6">Help us personalize your experience</p>
      
      <div className="space-y-4">
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Male', 'Female', 'Other', 'Prefer not to say'].map((gender) => (
              <label 
                key={gender} 
                className={`flex items-center justify-center p-3 rounded-xl border-2 ${
                  formData.gender === gender 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } cursor-pointer transition-colors duration-200`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span className="flex items-center">
                  <FaVenusMars className="mr-2 text-gray-600" />
                  {gender}
                </span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                errors.dob ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
            />
          </div>
          {errors.dob && (
            <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
          )}
        </div>
      </div>
    </>
  );

  // Step 3: Password
  const renderStepThree = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
      <p className="text-gray-600 mb-6">Create a strong password to protect your account</p>
      
      <div className="space-y-4">
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          {/* Password Strength Meter */}
          {formData.password && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getPasswordStrengthColor()}`} 
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-500">
                {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'} password
              </p>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        
        {/* Terms and Conditions */}
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Progress Steps
  const renderProgressSteps = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : step > stepNumber 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1 text-gray-500">
                {stepNumber === 1 ? 'Basic' : stepNumber === 2 ? 'Details' : 'Password'}
              </span>
            </div>
            {stepNumber < 3 && (
              <div className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'} bg-white rounded-2xl shadow-xl border border-gray-100`}>
      {!isMobile && renderProgressSteps()}
      
      <form onSubmit={step === 3 ? handleSubmit : handleNext}>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
        
        <div className="mt-8 flex space-x-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              disabled={isLoading}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-white shadow-lg transform transition-all duration-300 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                {step === 3 ? 'Creating Account...' : 'Loading...'}
              </div>
            ) : step === 3 ? (
              'Create Account'
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </form>
      
      {step === 1 && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative text-center">
              <span className="bg-white px-4 text-sm text-gray-500">Or sign up with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              type="button"
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button 
              type="button"
              onClick={() => handleSocialRegister('GitHub')}
              className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              <FaGithub className="mr-2" />
              GitHub
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
