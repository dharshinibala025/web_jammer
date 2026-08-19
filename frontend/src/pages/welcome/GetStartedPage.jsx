import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { 
  FiSmartphone, 
  FiClock, 
  FiShield, 
  FiUsers, 
  FiLock, 
  FiZap, 
  FiArrowRight, 
  FiMenu, 
  FiX, 
  FiCheck, 
  FiWifi, 
  FiEye, 
  FiSlash, 
  FiAward, 
  FiPhone, 
  FiChevronDown,
  FiCheckCircle,
  FiHelpCircle,
  FiDatabase,
  FiCheckSquare,
  FiXSquare,
  FiUnlock
} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import MagicRings from '../../components/MagicRings';

/* ============================================
   ANIMATED NUMBER COUNTER
   ============================================ */
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration, ease: 'easeOut' });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => { controls.stop(); unsub(); };
    }
  }, [isInView, target, duration, count, rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
};

/* ============================================
   FLOATING PARTICLES BACKGROUND
   ============================================ */
const FloatingParticles = () => {
  const particles = [
    { id: 1, x: 10, y: 15, size: 4, dur: 14, delay: 0, color: 'rgba(37,99,235,0.3)' },
    { id: 2, x: 25, y: 70, size: 5, dur: 18, delay: 1, color: 'rgba(16,185,129,0.25)' },
    { id: 3, x: 45, y: 22, size: 3, dur: 12, delay: 2, color: 'rgba(99,102,241,0.25)' },
    { id: 4, x: 72, y: 80, size: 4, dur: 16, delay: 0.5, color: 'rgba(37,99,235,0.25)' },
    { id: 5, x: 88, y: 30, size: 6, dur: 20, delay: 3, color: 'rgba(16,185,129,0.3)' },
    { id: 6, x: 94, y: 65, size: 3, dur: 15, delay: 1.5, color: 'rgba(99,102,241,0.2)' },
  ];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ============================================
   SECTION REVEAL WRAPPER
   ============================================ */
const SectionReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============================================
   MAIN GET STARTED / LANDING PAGE
   ============================================ */
export const GetStartedPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero interactive simulation toggle
  const [heroMode, setHeroMode] = useState('lecture'); // 'lecture' | 'break'

  // FAQ Category Filter
  const [faqCategory, setFaqCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const handleFaqCategoryChange = (category) => {
    setFaqCategory(category);
    setOpenFaq(-1);
  };

  const faqs = [
    {
      category: 'privacy',
      q: 'Does FocusSync monitor student private chats, photos, or browsing history?',
      a: 'Absolutely not. FocusSync strictly enforces zero-privacy-intrusion policies. Operating via native Android/iOS Enterprise Policy APIs, it acts purely as a scheduled launch gatekeeper for flagged entertainment package IDs. It has zero access to personal messages, gallery photos, passwords, call recordings, or browser cache.',
    },
    {
      category: 'operations',
      q: 'How does FocusSync disable distracting apps on student smartphones?',
      a: 'FocusSync integrates with K.S.R. College of Engineering timetable database. At the exact moment a lecture period starts, non-educational apps (Social Media, Streaming, Games) are instantly suspended locally. As soon as the tea break or lunch bell rings, full device access is automatically restored in under 0.05 seconds.',
    },
    {
      category: 'operations',
      q: 'What happens in case of an urgent family call or medical emergency?',
      a: 'Student safety is permanently protected. Standard Cellular Phone Calls, Emergency SMS, and College Helpline numbers are hardcoded as whitelisted 24 hours a day. Furthermore, students can submit an instant 5-minute emergency override request from their portal dashboard.',
    },
    {
      category: 'technical',
      q: 'Can students bypass the policy by turning off Wi-Fi or uninstalling the app?',
      a: 'No. FocusSync utilizes cryptographic Device Administrator enforcement. Timetable rules are cached locally on the device, ensuring enforcement continues even if mobile data or Wi-Fi is switched off. Any tampering or unauthorized uninstallation attempts immediately flag an alert on the Faculty and HOD console.',
    },
    {
      category: 'technical',
      q: 'Does FocusSync cause high battery drain or slow down student phones?',
      a: 'No. FocusSync runs as an ultra-lightweight event listener with zero background video/audio processing and zero continuous GPS polling. Benchmarks show daily battery consumption is less than 0.8%, which is undetectable during normal daily usage.',
    },
    {
      category: 'privacy',
      q: 'Who manages the departmental timetable rules and schedule changes?',
      a: 'The Head of Department (HOD) and designated Faculty Timetable Coordinators manage schedule configurations through the secure Admin Portal. Special event schedules, symposium days, or guest lectures can be updated campus-wide with one click.',
    }
  ];

  const filteredFaqs = faqCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === faqCategory);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(window.scrollY / totalScroll, 1));
      }

      const navSections = ['home', 'portals', 'comparison', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (let i = navSections.length - 1; i >= 0; i--) {
        const id = navSections[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'portals', label: 'Portals' },
    { id: 'comparison', label: 'Why FocusSync' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative z-0">
      
      {/* Top Scroll Indicator Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX: scrollProgress,
          background: 'linear-gradient(90deg, #2563eb 0%, #10b981 50%, #6366f1 100%)',
        }}
      />

      {/* Subtle Background Canvas */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
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
          hoverScale={1.03}
        />
      </div>

      {/* Ambient Dust Particles */}
      <FloatingParticles />

      {/* Radial Ambient Glows */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-glow-light-blue pointer-events-none -z-10 rounded-full blur-3xl opacity-45"></div>
      <div className="fixed bottom-1/3 right-0 w-[600px] h-[450px] bg-glow-light-emerald pointer-events-none -z-10 rounded-full blur-3xl opacity-35"></div>

      {/* ====================================================
          TOP ENTERPRISE NAVIGATION BAR
         ==================================================== */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`pointer-events-auto max-w-5xl w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-900/5 text-slate-900'
              : 'bg-white/90 backdrop-blur-lg border border-slate-200/90 shadow-sm text-slate-900'
          }`}
        >
          {/* Institution Crest & Brand */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="flex items-center space-x-2.5 group px-2 py-1 rounded-full hover:bg-slate-100/80 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform bg-white border border-slate-200/90 shadow-xs">
              <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base font-bold tracking-tight leading-none font-heading text-slate-900">
                Focus<span className="text-blue-600">Sync</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold rounded-full uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                KSR CE • CSE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center p-1 rounded-full border border-slate-200/80 bg-slate-100/70 space-x-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      scrollToSection(item.id);
                    }
                    setActiveSection(item.id);
                  }}
                  className={`relative px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="landingNavActivePill"
                      className="absolute inset-0 rounded-full bg-white shadow-xs border border-slate-200/80 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
            >
              <span>Portal Login</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="md:hidden absolute top-16 inset-x-4 pointer-events-auto rounded-3xl p-4 bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl space-y-1 text-center"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    scrollToSection(item.id);
                  }
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* ====================================================
          HERO SECTION
         ==================================================== */}
      <section id="home" className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Authoritative Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Institution Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/90 text-xs font-medium text-blue-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>K.S.R. College of Engineering (Autonomous) • Dept. of CSE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.18] font-heading">
              Smart Classroom <br />
              <span className="text-blue-600">Mobile Usage Governance</span> <br />
              & Focus Enforcer System.
            </h1>

            {/* Subheadline */}
            <p className="text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              FocusSync automatically suspends distracting social media, video reels, and mobile games during active lecture hours — keeping students attentive without physically confiscating phones.
            </p>

            {/* Blocked vs Whitelisted Quick Badges */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs space-y-2.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  🚫 Blocked in Lecture:
                </span>
                {['Instagram', 'YouTube Shorts', 'BGMI / FreeFire', 'Snapchat', 'Netflix'].map((app) => (
                  <span key={app} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {app}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✅ Allowed 24/7:
                </span>
                {['Canvas / LMS', 'Google Classroom', 'Scientific Tools', 'Emergency Phone Calls'].map((app) => (
                  <span key={app} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50/60 border border-emerald-200 text-emerald-800">
                    <FiCheck className="w-3 h-3 text-emerald-600" />
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Institutional Portal Login</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => scrollToSection('portals')}
                className="px-5 py-3 bg-white text-slate-700 font-medium text-sm rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer flex items-center space-x-2"
              >
                <FiUsers className="w-4 h-4 text-blue-600" />
                <span>Explore Campus Portals</span>
              </motion.button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-500 w-4 h-4" />
                <span>Zero Privacy Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiShield className="text-blue-600 w-4 h-4" />
                <span>Knox & MDM Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiZap className="text-purple-600 w-4 h-4" />
                <span>Bell-Synchronized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiPhone className="text-emerald-600 w-4 h-4" />
                <span>Emergency Calls Active</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Interactive Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient Backlight */}
            <div className="absolute w-[300px] h-[420px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-emerald-400/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* Floating Top Telemetry Pill */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -left-4 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/90 hidden sm:flex items-center space-x-2 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="font-semibold text-slate-800">Campus Geofence Active</span>
              <span className="text-[10px] text-blue-600 font-mono bg-blue-50 px-1.5 py-0.5 rounded">KSRCE-CSE</span>
            </motion.div>

            {/* Floating Bottom Telemetry Pill */}
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -right-4 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/90 hidden sm:flex items-center space-x-2 text-xs"
            >
              <FiShield className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold text-slate-800">Policy Enforced</span>
              <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">99.8% Synced</span>
            </motion.div>

            {/* Ultra-Sleek Smartphone Chassis */}
            <div className="relative w-[270px] bg-slate-900 rounded-[40px] p-3 shadow-xl border-4 border-slate-800/90 phone-chassis">
              
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-4 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>

              {/* Inner Smartphone Screen Display */}
              <div className="w-full bg-slate-50 rounded-[32px] overflow-hidden flex flex-col pt-7 pb-4 px-3 border border-slate-200">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[9px] font-semibold text-slate-500 px-1 pb-2">
                  <span>09:42 AM</span>
                  <div className="flex items-center space-x-1.5">
                    <FiWifi className="w-2.5 h-2.5 text-blue-600" />
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.2 flex items-center">
                      <div className="h-full w-3 bg-emerald-500 rounded-2xs"></div>
                    </div>
                  </div>
                </div>

                {/* Academic Session Header Card */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 mb-2.5 ${
                  heroMode === 'lecture' 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-2xs' 
                    : 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                      {heroMode === 'lecture' ? '🔒 Lecture In Session' : '🟢 Break / Restored'}
                    </span>
                    <span className="text-[9px] font-mono">Hall CS-301</span>
                  </div>
                  <p className="text-xs font-bold font-heading mt-1 leading-tight">
                    {heroMode === 'lecture' ? 'Data Structures & Algorithms' : 'Department Tea Break'}
                  </p>
                  <p className="text-[9px] opacity-80 mt-0.5 flex items-center gap-1">
                    <FiClock className="w-2.5 h-2.5" />
                    {heroMode === 'lecture' ? '18 mins remaining in period' : 'Normal app access restored'}
                  </p>
                </div>

                {/* Simulated Phone App Icons Grid */}
                <div className="grid grid-cols-3 gap-2 text-center my-1 flex-1">
                  
                  {/* Instagram */}
                  <div className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    heroMode === 'lecture' ? 'bg-slate-100/90 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <span className="text-base">📸</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">Instagram</span>
                    <span className={`text-[7px] font-semibold px-1 rounded mt-0.5 ${
                      heroMode === 'lecture' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
                    }`}>
                      {heroMode === 'lecture' ? 'LOCKED' : 'READY'}
                    </span>
                  </div>

                  {/* YouTube */}
                  <div className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    heroMode === 'lecture' ? 'bg-slate-100/90 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <span className="text-base">▶️</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">YouTube</span>
                    <span className={`text-[7px] font-semibold px-1 rounded mt-0.5 ${
                      heroMode === 'lecture' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
                    }`}>
                      {heroMode === 'lecture' ? 'LOCKED' : 'READY'}
                    </span>
                  </div>

                  {/* BGMI / Gaming */}
                  <div className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    heroMode === 'lecture' ? 'bg-slate-100/90 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <span className="text-base">🎮</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">BGMI Game</span>
                    <span className={`text-[7px] font-semibold px-1 rounded mt-0.5 ${
                      heroMode === 'lecture' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
                    }`}>
                      {heroMode === 'lecture' ? 'LOCKED' : 'READY'}
                    </span>
                  </div>

                  {/* Google Classroom */}
                  <div className="p-2 rounded-xl border bg-emerald-50/80 border-emerald-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">📚</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">Classroom</span>
                    <span className="text-[7px] font-semibold px-1 rounded mt-0.5 text-emerald-700 bg-emerald-100">
                      ACTIVE
                    </span>
                  </div>

                  {/* Scientific Calc */}
                  <div className="p-2 rounded-xl border bg-emerald-50/80 border-emerald-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">🧮</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">Calculator</span>
                    <span className="text-[7px] font-semibold px-1 rounded mt-0.5 text-emerald-700 bg-emerald-100">
                      ACTIVE
                    </span>
                  </div>

                  {/* Emergency Phone */}
                  <div className="p-2 rounded-xl border bg-blue-50/80 border-blue-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">📞</span>
                    <span className="text-[8px] font-semibold text-slate-800 mt-1">Phone Call</span>
                    <span className="text-[7px] font-semibold px-1 rounded mt-0.5 text-blue-700 bg-blue-100">
                      24/7 OPEN
                    </span>
                  </div>

                </div>

                {/* Bottom Device Policy Strip */}
                <div className="mt-2 bg-slate-900 text-white rounded-xl p-2 flex items-center justify-between text-[8px] font-medium">
                  <span className="flex items-center gap-1">
                    <FiShield className="text-emerald-400 w-2.5 h-2.5" />
                    Enforced by Dept. CSE
                  </span>
                  <span className="text-slate-400">v2.4 Live</span>
                </div>

              </div>

            </div>

            {/* Interactive Mode Switcher under Mockup */}
            <div className="mt-3 bg-white rounded-full p-1 border border-slate-200 shadow-sm flex items-center space-x-1">
              <button
                onClick={() => setHeroMode('lecture')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                  heroMode === 'lecture' 
                    ? 'bg-blue-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FiLock className="w-3 h-3" />
                <span>Simulate Lecture Hour</span>
              </button>
              <button
                onClick={() => setHeroMode('break')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                  heroMode === 'break' 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FiUnlock className="w-3 h-3" />
                <span>Simulate Break Time</span>
              </button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ====================================================
          DEPARTMENT METRICS & LIVE TELEMETRY STRIP
         ==================================================== */}
      <section className="relative z-10 mb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-5 sm:p-7">
              
              {/* Telemetry Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                    Live Department Telemetry Stream
                  </span>
                  <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    K.S.R. College of Engineering
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-normal">
                  Last Bell Sync: 09:00:00 AM • Next Sync: 10:00:00 AM
                </span>
              </div>

              {/* 4 Impact Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-5 text-center">
                {[
                  { value: 480, suffix: '+', label: 'Active Student Devices', sub: 'Autonomous Enforced', icon: <FiUsers />, color: 'text-blue-600 bg-blue-50' },
                  { value: 50, suffix: '+', label: 'Distracting Apps Filtered', sub: 'Gaming & Social Media', icon: <FiSlash />, color: 'text-rose-600 bg-rose-50' },
                  { value: 100, suffix: '%', label: 'Timetable Precision', sub: 'Zero Faculty Overhead', icon: <FiClock />, color: 'text-emerald-600 bg-emerald-50' },
                  { value: 99, suffix: '.8%', label: 'Classroom Engagement', sub: 'Department Verified', icon: <FiShield />, color: 'text-purple-600 bg-purple-50' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center space-y-1">
                    <div className={`w-10 h-10 rounded-2xl ${stat.color} flex items-center justify-center text-lg`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-slate-700 font-medium max-w-[150px] leading-tight">{stat.label}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{stat.sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====================================================
          MULTI-ROLE INSTITUTIONAL PORTALS
         ==================================================== */}
      <section id="portals" className="py-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiUsers className="w-3 h-3" />
                Institutional Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                Dedicated Multi-Role Portals
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Log into your personalized dashboard with secure K.S.R. institutional credentials.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Student Portal Card */}
            <SectionReveal delay={0.1}>
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-xs p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 font-bold group-hover:scale-105 transition-transform">
                    <FiSmartphone />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Student Portal</h3>
                  <p className="text-xs text-slate-500 font-normal mt-2 leading-relaxed">
                    View active lecture restrictions, check personal timetable sync status, verify device health, and submit emergency override passes.
                  </p>
                  <div className="mt-4 space-y-2 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Active Schedule & Bell Counter</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Allowed Educational App Inventory</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> 5-Minute Emergency Pass Request</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/student/login')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs shadow-blue-600/20"
                >
                  <span>Student Login</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </SectionReveal>

            {/* Faculty Portal Card */}
            <SectionReveal delay={0.2}>
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-xs p-6 sm:p-7 rounded-3xl border-2 border-emerald-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between h-full relative group"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                    Classroom Control
                  </span>
                </div>
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-4 font-bold group-hover:scale-105 transition-transform">
                    <FiUsers />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Faculty & Staff Portal</h3>
                  <p className="text-xs text-slate-500 font-normal mt-2 leading-relaxed">
                    Live classroom compliance monitoring, student roster tracking, broadcast emergency alerts, and manual lecture session overrides.
                  </p>
                  <div className="mt-4 space-y-2 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Live Classroom Focus Telemetry</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> One-Click Lecture Session Overrides</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Tamper & Disconnect Instant Alerts</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/staff/login')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs shadow-emerald-600/20"
                >
                  <span>Faculty & Staff Login</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </SectionReveal>

            {/* Admin Panel Card */}
            <SectionReveal delay={0.3}>
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-xs p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4 font-bold group-hover:scale-105 transition-transform">
                    <FiShield />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Admin & HOD Console</h3>
                  <p className="text-xs text-slate-500 font-normal mt-2 leading-relaxed">
                    Department policy rules, academic timetable synchronization, device audit logs, staff management, and system telemetry.
                  </p>
                  <div className="mt-4 space-y-2 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Department Master Policy Rules</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Timetable Database Bulk Sync</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Audit Logs & Accreditation Reports</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/admin/login')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs shadow-purple-600/20"
                >
                  <span>Admin & HOD Login</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </SectionReveal>

          </div>

        </div>
      </section>

      {/* ====================================================
          WHY FOCUSSYNC: COMPARISON MATRIX
         ==================================================== */}
      <section id="comparison" className="py-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200">
                <FiAward className="w-3 h-3" />
                Institutional Value
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                Why Modern Universities Choose FocusSync
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Traditional phone boxes and confiscation waste valuable class time and risk device damage. FocusSync solves digital discipline through intelligent software governance.
              </p>
            </div>
          </SectionReveal>

          {/* Comparison Table */}
          <SectionReveal delay={0.1}>
            <div className="bg-white/90 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider font-heading">
                <div className="md:col-span-4 p-4 text-slate-600">Governance Metric</div>
                <div className="md:col-span-4 p-4 text-rose-600 bg-rose-50/50 border-x border-slate-200">Traditional Phone Confiscation</div>
                <div className="md:col-span-4 p-4 text-blue-600 bg-blue-50/50">FocusSync Smart Enforcer</div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {[
                  {
                    metric: 'Classroom Lecture Time Overhead',
                    oldVal: '10–15 minutes wasted collecting and returning phones physically.',
                    newVal: '0 seconds. Synchronizes automatically at period bell.',
                  },
                  {
                    metric: 'Student Safety & Emergency Reach',
                    oldVal: 'Zero contact. Parents cannot reach student during urgent emergencies.',
                    newVal: 'Standard cellular phone calls & SMS always preserved 24/7.',
                  },
                  {
                    metric: 'Device Security & College Liability',
                    oldVal: 'High risk of dropped screens, theft, or mixed-up devices.',
                    newVal: 'Phone stays safely in student pocket with zero college liability.',
                  },
                  {
                    metric: 'Access to Educational LMS Tools',
                    oldVal: 'Impossible. Students cannot access Google Classroom or calculators.',
                    newVal: 'Allowed. Educational platforms remain active for lectures.',
                  },
                  {
                    metric: 'Student Dignity & Compliance',
                    oldVal: 'Fosters resentment and hiding secondary dummy phones.',
                    newVal: 'Transparent timetable governance with fair automated rules.',
                  },
                ].map((row) => (
                  <div key={row.metric} className="grid grid-cols-1 md:grid-cols-12 items-center hover:bg-slate-50/60 transition-colors">
                    <div className="md:col-span-4 p-4 font-semibold text-slate-900">{row.metric}</div>
                    <div className="md:col-span-4 p-4 text-slate-600 bg-rose-50/20 border-x border-slate-100 flex items-start gap-2">
                      <FiXSquare className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="font-normal">{row.oldVal}</span>
                    </div>
                    <div className="md:col-span-4 p-4 text-slate-800 bg-blue-50/20 font-medium flex items-start gap-2">
                      <FiCheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.newVal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

        </div>
      </section>

      {/* ====================================================
          CAMPUS PRIVACY & SECURITY ARCHITECTURE
         ==================================================== */}
      <section className="py-14 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiLock className="w-3 h-3" />
                Privacy Safeguard
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                100% Zero-Surveillance Architecture
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                FocusSync is built strictly as an academic schedule enforcer, not a spyware tool.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                <FiEye />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">No Chat or Media Access</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                The enforcer operates at the OS package launcher level. It cannot read text messages, view gallery photos, inspect camera feeds, or log keystrokes.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                <FiDatabase />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">Zero Location Tracking</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Campus geofencing verifies connection to authorized department Wi-Fi BSSID identifiers without actively recording student GPS coordinates.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
                <FiShield />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">Institutional Encryption</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                All telemetry data between student devices and the department server is secured via TLS 1.3 encryption and institutional tokens.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          FREQUENTLY ASKED QUESTIONS (ACCORDION WITH CATEGORY)
         ==================================================== */}
      <section id="faq" className="py-16 bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <SectionReveal>
            <div className="text-center mb-8 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiHelpCircle className="w-3 h-3" />
                Institutional FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Everything students and faculty need to know about schedule rules, safety, and privacy.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'privacy', label: 'Privacy & Security' },
                { id: 'operations', label: 'Classroom Operations' },
                { id: 'technical', label: 'Device & Battery' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleFaqCategoryChange(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    faqCategory === c.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <SectionReveal key={faq.q} delay={idx * 0.04}>
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between cursor-pointer font-heading font-semibold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <FiChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ====================================================
          INSTITUTIONAL CALL TO ACTION
         ==================================================== */}
      <section className="py-14 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-7 sm:p-10 text-center text-white relative overflow-hidden shadow-xl">
              
              {/* Radial Accent Glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 mx-auto border border-white/20 shadow-xs flex items-center justify-center">
                  <img src={logo} alt="FocusSync" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
                  Empowering 100% Focused Classrooms Across Campus
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  FocusSync is actively running across the Department of Computer Science & Engineering at K.S.R. College of Engineering (Autonomous).
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>Sign In to Institutional Portal</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollToSection('portals')}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <FiUsers className="w-3.5 h-3.5 text-blue-300" />
                    <span>View Campus Portals</span>
                  </button>
                </div>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====================================================
          OFFICIAL INSTITUTIONAL FOOTER
         ==================================================== */}
      <footer 
        id="contact" 
        className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-blue-900"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white border border-blue-200 p-1 rounded-xl flex items-center justify-center shadow-xs">
                <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Focus<span className="text-emerald-400">Sync</span>
              </span>
            </div>
            <p className="text-xs font-normal text-blue-100 max-w-sm leading-relaxed">
              Smart Classroom Mobile Usage Governance & Enforcer System. Developed for the Department of Computer Science & Engineering, K.S.R. College of Engineering (Autonomous), Tiruchengode.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-blue-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All 12 Lecture Halls & Labs Synchronized</span>
            </div>
          </div>

          {/* Quick Portals */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-heading">Portals & Login</h4>
            <ul className="space-y-1.5 text-xs font-normal text-blue-100">
              <li><Link to="/student/login" className="hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link to="/staff/login" className="hover:text-white transition-colors">Faculty & Staff Portal</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin & HOD Console</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Unified Login Hub</Link></li>
            </ul>
          </div>

          {/* Department Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-heading">Department Address</h4>
            <p className="text-xs font-semibold text-white">Dept. of Computer Science & Engineering</p>
            <p className="text-xs text-blue-100 leading-relaxed font-normal">K.S.R. College of Engineering (Autonomous), K.S.R. Kalvi Nagar, Tiruchengode – 637 215, Tamil Nadu, India.</p>
            <p className="text-xs font-medium text-blue-200 mt-1">hodcse@ksrce.ac.in • support@focussync.edu</p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-blue-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-blue-100">
          <p>© 2026 FocusSync System. K.S.R. College of Engineering. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-medium">
            <span className="hover:text-white cursor-pointer">Zero-Surveillance Policy</span>
            <span className="hover:text-white cursor-pointer">Academic Terms</span>
            <span className="hover:text-white cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GetStartedPage;
