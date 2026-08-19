import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiCheck, 
  FiShield, 
  FiLock, 
  FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import RoleSelector from '../../components/common/RoleSelector';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import logo from '../../assets/logo.png';
import MagicRings from '../../components/MagicRings';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Detect role from URL path if specified
  const getInitialRole = () => {
    if (location.pathname.includes('/staff')) return 'staff';
    if (location.pathname.includes('/admin')) return 'admin';
    return 'student';
  };

  const [role, setRole] = useState(getInitialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync role if path changes
  useEffect(() => {
    if (location.pathname.includes('/staff')) setRole('staff');
    else if (location.pathname.includes('/admin')) setRole('admin');
    else setRole('student');
  }, [location.pathname]);

  // Demo accounts helper
  const demoAccounts = {
    student: { email: 'student@ksrce.ac.in', label: 'Demo Student' },
    staff: { email: 'faculty@ksrce.ac.in', label: 'Demo Faculty' },
    admin: { email: 'admin@ksrce.ac.in', label: 'Demo Admin / HOD' },
  };

  const fillDemoAccount = () => {
    const acc = demoAccounts[role];
    if (acc) {
      setEmail(acc.email);
      setPassword('password123');
      setErrors({});
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Institutional email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid institutional email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
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
        setErrors({ email: 'Authentication failed. Please verify credentials.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Background Magic Rings Canvas */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-35">
        <MagicRings
          color="#93c5fd"
          colorTwo="#3b82f6"
          ringCount={5}
          speed={0.4}
          attenuation={12}
          lineThickness={1.2}
          baseRadius={0.45}
          radiusStep={0.14}
          scaleRate={0.05}
          opacity={0.4}
          blur={1.5}
          noiseAmount={0.005}
          followMouse={true}
          mouseInfluence={0.06}
        />
      </div>

      {/* Radial Ambient Glow Orbs */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-glow-light-blue pointer-events-none -z-10 rounded-full blur-3xl opacity-40"></div>

      {/* Top Header */}
      <header className="w-full pt-4 sm:pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between z-20">
        <Link
          to="/"
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 p-1 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center">
            <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-lg font-bold tracking-tight leading-none font-heading text-slate-900">
              Focus<span className="text-blue-600">Sync</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold rounded-full uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
              KSR CE • CSE
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-2xs cursor-pointer"
          >
            <FiArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Back to Overview</span>
          </button>
        </div>
      </header>

      {/* Centered Login Form Card */}
      <main className="w-full max-w-md mx-auto px-4 py-8 flex-1 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-2xl shadow-slate-900/5 space-y-5"
        >
          
          {/* Card Header */}
          <div className="text-center space-y-1.5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 p-1.5 mx-auto shadow-2xs flex items-center justify-center">
              <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight pt-1">
              Portal Sign In
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Select your account role to sign into the institutional portal.
            </p>
          </div>

          {/* Role Switcher Component (Student, Staff, Admin) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider font-heading text-center">
              Account Access Level
            </label>
            <RoleSelector selectedRole={role} onSelectRole={setRole} />
          </div>

          {/* Contextual Role Helper Alert */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center justify-between font-normal">
            <span className="flex items-center gap-1.5">
              <FiLock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              {role === 'student' && 'Student Portal: View active timetable & allowed apps.'}
              {role === 'staff' && 'Faculty Portal: Live monitoring & classroom control.'}
              {role === 'admin' && 'Admin Console: Department rules & system management.'}
            </span>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 hover:underline shrink-0 cursor-pointer ml-1"
              title="Fill demo credentials"
            >
              Auto-fill Demo
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <InputField
              label="Institutional Email"
              value={email}
              onChange={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              placeholder={
                role === 'student' 
                  ? 'student@ksrce.ac.in' 
                  : role === 'staff' 
                    ? 'faculty@ksrce.ac.in' 
                    : 'admin@ksrce.ac.in'
              }
              iconType="email"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChange={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              placeholder="••••••••••••"
              isPassword={true}
              error={errors.password}
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    rememberMe ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  {rememberMe && <FiCheck className="w-3 h-3" />}
                </div>
                <span className="text-xs font-medium text-slate-700">Remember session</span>
              </label>

              <span className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                Need Assistance?
              </span>
            </div>

            {/* Error Alert Box */}
            {errors.email && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-700 flex items-center space-x-2 font-medium">
                <FiAlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errors.email}</span>
              </div>
            )}

            {/* Submit Button */}
            <PrimaryButton
              title={`Sign In to ${role === 'student' ? 'Student' : role === 'staff' ? 'Faculty & Staff' : 'Admin & HOD'} Portal`}
              onPress={handleSignIn}
              loading={loading}
            />
          </form>

          {/* Footer Trust Bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <FiShield className="w-3 h-3 text-emerald-500" />
              TLS 1.3 Encrypted
            </span>
            <span>K.S.R. College of Engineering</span>
          </div>

        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 font-normal border-t border-slate-200/60 z-20">
        <p>© 2026 FocusSync System • Dept. of Computer Science & Engineering, KSRCE.</p>
      </footer>

    </div>
  );
};

export default LoginPage;
