import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiShield } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import RoleSelector from '../../components/common/RoleSelector';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import logo from '../../assets/logo.png';
import MagicRings from '../../components/MagicRings';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await login(email, password, role);
        if (res.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (res.role === 'staff') {
          navigate('/staff/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } catch (err) {
        setErrors({ email: 'Login failed. Please verify credentials.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-8 font-sans relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Soft Background Magic Rings */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
        <MagicRings
          color="#93c5fd"
          colorTwo="#3b82f6"
          ringCount={6}
          speed={0.7}
          attenuation={10}
          lineThickness={1.5}
          baseRadius={0.4}
          radiusStep={0.12}
          scaleRate={0.08}
          opacity={0.45}
          noiseAmount={0.01}
          followMouse={true}
          mouseInfluence={0.15}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors mb-6 cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Welcome</span>
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-md mb-3 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">FocusSync</h2>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center justify-center gap-1">
            <FiShield className="w-3.5 h-3.5 text-emerald-500" />
            Department Mobile Controller
          </p>
        </div>

        <div className="h-px bg-slate-200 my-4" />

        {/* Welcome Section */}
        <div className="text-left mb-4">
          <h3 className="text-xl font-extrabold text-slate-900 font-heading">Welcome Back</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Sign in using your institutional account.
          </p>
        </div>

        {/* Role Selector */}
        <div className="my-4">
          <RoleSelector selectedRole={role} onSelectRole={setRole} />
        </div>

        <div className="h-px bg-slate-200 my-4" />

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <InputField
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
            placeholder="enter.your.email@college.edu"
            iconType="email"
            error={errors.email}
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
            }}
            placeholder="••••••••••••"
            isPassword={true}
            error={errors.password}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between my-2">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  rememberMe ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                }`}
              >
                {rememberMe && <FiCheck className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className="text-xs font-semibold text-slate-700">Remember Me</span>
            </label>
          </div>

          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
          />
        </form>

        <div className="h-px bg-slate-200 my-6" />

        {/* Footer Section */}
        <div className="text-center text-[11px] text-slate-400 font-medium space-y-0.5">
          <p className="font-semibold text-slate-600">FocusSync System</p>
          <p>Department Mobile Controller</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
