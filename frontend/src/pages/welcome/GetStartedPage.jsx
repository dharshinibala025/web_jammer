import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { 
  FiSmartphone, 
  FiActivity, 
  FiClock, 
  FiShield, 
  FiUsers, 
  FiLock, 
  FiZap, 
  FiBarChart2, 
  FiArrowRight, 
  FiMenu, 
  FiX, 
  FiCheck, 
  FiWifi, 
  FiEye, 
  FiBell, 
  FiSlash, 
  FiTarget, 
  FiAward, 
  FiBookOpen, 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiHelpCircle,
  FiSliders,
  FiLayers,
  FiCpu,
  FiRefreshCw,
  FiGrid,
  FiInfo,
  FiDatabase,
  FiRadio,
  FiCornerDownRight,
  FiCheckSquare,
  FiXSquare,
  FiUnlock,
  FiAlertTriangle
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
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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

  // Interactive Live Simulator State
  const [activePeriod, setActivePeriod] = useState(0);
  const [simulatedAppModal, setSimulatedAppModal] = useState(null); // { name, status, icon, desc }
  const [overrideRequested, setOverrideRequested] = useState(false);
  const [overrideApproved, setOverrideApproved] = useState(false);

  // FAQ Category Filter
  const [faqCategory, setFaqCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const overrideTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
    };
  }, []);

  const handleFaqCategoryChange = (category) => {
    setFaqCategory(category);
    setOpenFaq(-1);
  };

  const periods = [
    { 
      id: 0,
      time: '09:00 - 10:00 AM', 
      subject: 'Data Structures & Algorithms', 
      room: 'Hall CS-301', 
      faculty: 'Dr. S. Ramesh, M.E., Ph.D.',
      mode: 'LOCKED', 
      desc: 'High concentration theoretical & practical algorithmic session.'
    },
    { 
      id: 1,
      time: '10:00 - 11:00 AM', 
      subject: 'Operating Systems & Kernel Lab', 
      room: 'Systems Lab 2', 
      faculty: 'Prof. K. Priya, M.Tech.',
      mode: 'LOCKED', 
      desc: 'Hands-on Linux kernel programming & process scheduling.'
    },
    { 
      id: 2,
      time: '11:00 - 11:30 AM', 
      subject: 'Department Interval & Refreshment', 
      room: 'Campus Wide', 
      faculty: 'Campus Open Hours',
      mode: 'RESTORED', 
      desc: 'Scheduled intermission. All student applications fully accessible.'
    },
    { 
      id: 3,
      time: '11:30 - 12:30 PM', 
      subject: 'Full Stack Web Architecture', 
      room: 'Smart Class 4', 
      faculty: 'Dr. M. Vignesh, Ph.D.',
      mode: 'LOCKED', 
      desc: 'Cloud deployment, RESTful APIs, and React frontend workflows.'
    },
  ];

  const appsCatalog = [
    { id: 'insta', name: 'Instagram', cat: 'Social Media', status: 'blocked', icon: '📸', desc: 'Reels, feeds, and direct messaging disabled during class hours.' },
    { id: 'yt', name: 'YouTube', cat: 'Entertainment', status: 'blocked', icon: '▶️', desc: 'Video streaming and shorts paused. Whitelisted for faculty-led demos.' },
    { id: 'pubg', name: 'BGMI / Mobile Gaming', cat: 'Gaming', status: 'blocked', icon: '🎮', desc: 'Online multiplayer gaming traffic & background engines suspended.' },
    { id: 'snap', name: 'Snapchat', cat: 'Social Media', status: 'blocked', icon: '👻', desc: 'Camera stories and snap map blocked during academic time.' },
    { id: 'gclass', name: 'Google Classroom', cat: 'Education', status: 'allowed', icon: '📚', desc: 'Official assignment submissions and lecture slide downloads enabled 24/7.' },
    { id: 'calc', name: 'Scientific Tools', cat: 'Utility', status: 'allowed', icon: '🧮', desc: 'Engineering calculators, graph plotting, and reference apps always active.' },
    { id: 'lms', name: 'KSRCE Canvas LMS', cat: 'Institutional', status: 'allowed', icon: '🎓', desc: 'Direct portal to college syllabus, attendance marks, and internal exams.' },
    { id: 'calls', name: 'Emergency Calls & SMS', cat: 'Emergency Core', status: 'allowed', icon: '📞', desc: 'Unconditional safety channel for parents, family, and campus security.' }
  ];

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

      const navSections = ['home', 'features', 'simulator', 'portals', 'comparison', 'faq'];
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
    { id: 'features', label: 'Capabilities' },
    { id: 'simulator', label: 'Live Simulator' },
    { id: 'portals', label: 'Portals' },
    { id: 'comparison', label: 'Why FocusSync' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleSimulateAppClick = (app) => {
    const isLocked = periods[activePeriod].mode === 'LOCKED' && app.status === 'blocked';
    setSimulatedAppModal({
      name: app.name,
      icon: app.icon,
      category: app.cat,
      isLocked,
      desc: app.desc
    });
  };

  const handleRequestOverride = useCallback(() => {
    setOverrideRequested(true);
    overrideTimerRef.current = setTimeout(() => {
      setOverrideApproved(true);
    }, 1500);
  }, []);

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
          className={`pointer-events-auto max-w-6xl w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-900/8 text-slate-900'
              : 'bg-white/90 backdrop-blur-lg border border-slate-200/90 shadow-md shadow-slate-900/5 text-slate-900'
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
              <span className="text-base font-extrabold tracking-tight leading-none font-heading text-slate-900">
                Focus<span className="text-blue-600">Sync</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
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
                  className={`relative px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? 'text-blue-600 font-extrabold'
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
              className="px-4 sm:px-5 py-2 text-xs font-extrabold rounded-full transition-all cursor-pointer flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-95"
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
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
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
          HERO SECTION (ELEVATED HERO + HIGH-END INTERACTIVE MOCKUP)
         ==================================================== */}
      <section id="home" className="relative w-full pt-32 pb-16 md:pt-38 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Authoritative Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Institution Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-xs font-bold text-blue-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>K.S.R. College of Engineering (Autonomous) • Dept. of CSE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] font-heading">
              Smart Classroom <br />
              <span className="text-blue-600">Mobile Usage Governance</span> <br />
              & Focus Enforcer System.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              FocusSync automatically suspends distracting social media, video reels, and mobile games during active lecture hours — keeping students attentive without physically confiscating phones.
            </p>

            {/* Blocked vs Whitelisted Quick Badges */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/90 shadow-xs space-y-2.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  🚫 Blocked in Lecture:
                </span>
                {['Instagram', 'YouTube Shorts', 'BGMI / FreeFire', 'Snapchat', 'Netflix'].map((app) => (
                  <span key={app} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {app}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✅ Allowed 24/7:
                </span>
                {['Canvas / LMS', 'Google Classroom', 'Scientific Tools', 'Emergency Phone Calls'].map((app) => (
                  <span key={app} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50/60 border border-emerald-200 text-emerald-800">
                    <FiCheck className="w-3 h-3 text-emerald-600" />
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 16px 32px -8px rgba(37, 99, 235, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center space-x-2.5"
              >
                <span>Institutional Portal Login</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('simulator')}
                className="px-6 py-3.5 bg-white text-slate-700 font-bold text-sm rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer flex items-center space-x-2"
              >
                <FiSliders className="w-4 h-4 text-blue-600" />
                <span>Test Live Simulator</span>
              </motion.button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-slate-500 font-semibold">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient Backlight */}
            <div className="absolute w-[340px] h-[480px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-emerald-400/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* Floating Top Telemetry Pill */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-6 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 hidden sm:flex items-center space-x-2 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="font-extrabold text-slate-800">Campus Geofence Active</span>
              <span className="text-[10px] text-blue-600 font-mono bg-blue-50 px-1.5 py-0.5 rounded">BSSID: KSRCE-CSE</span>
            </motion.div>

            {/* Floating Bottom Telemetry Pill */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -right-6 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 hidden sm:flex items-center space-x-2 text-xs"
            >
              <FiShield className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-extrabold text-slate-800">Policy: Autonomous Enforced</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">99.8% Synced</span>
            </motion.div>

            {/* Ultra-Sleek Smartphone Chassis */}
            <div className="relative w-[280px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800/90 phone-chassis">
              
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-4 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>

              {/* Inner Smartphone Screen Display */}
              <div className="w-full bg-slate-50 rounded-[34px] overflow-hidden flex flex-col pt-7 pb-4 px-3 border border-slate-200">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 px-1 pb-2">
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
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                    : 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                      {heroMode === 'lecture' ? '🔒 Lecture In Session' : '🟢 Break / Restored'}
                    </span>
                    <span className="text-[9px] font-mono font-bold">Hall CS-301</span>
                  </div>
                  <p className="text-xs font-extrabold font-heading mt-1 leading-tight">
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
                    <span className="text-[8px] font-bold text-slate-800 mt-1">Instagram</span>
                    <span className={`text-[7px] font-extrabold px-1 rounded mt-0.5 ${
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
                    <span className="text-[8px] font-bold text-slate-800 mt-1">YouTube</span>
                    <span className={`text-[7px] font-extrabold px-1 rounded mt-0.5 ${
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
                    <span className="text-[8px] font-bold text-slate-800 mt-1">BGMI Game</span>
                    <span className={`text-[7px] font-extrabold px-1 rounded mt-0.5 ${
                      heroMode === 'lecture' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
                    }`}>
                      {heroMode === 'lecture' ? 'LOCKED' : 'READY'}
                    </span>
                  </div>

                  {/* Google Classroom */}
                  <div className="p-2 rounded-xl border bg-emerald-50/80 border-emerald-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">📚</span>
                    <span className="text-[8px] font-bold text-slate-800 mt-1">Classroom</span>
                    <span className="text-[7px] font-extrabold px-1 rounded mt-0.5 text-emerald-700 bg-emerald-100">
                      ACTIVE
                    </span>
                  </div>

                  {/* Scientific Calc */}
                  <div className="p-2 rounded-xl border bg-emerald-50/80 border-emerald-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">🧮</span>
                    <span className="text-[8px] font-bold text-slate-800 mt-1">Calculator</span>
                    <span className="text-[7px] font-extrabold px-1 rounded mt-0.5 text-emerald-700 bg-emerald-100">
                      ACTIVE
                    </span>
                  </div>

                  {/* Emergency Phone */}
                  <div className="p-2 rounded-xl border bg-blue-50/80 border-blue-200 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-base">📞</span>
                    <span className="text-[8px] font-bold text-slate-800 mt-1">Phone Call</span>
                    <span className="text-[7px] font-extrabold px-1 rounded mt-0.5 text-blue-700 bg-blue-100">
                      24/7 OPEN
                    </span>
                  </div>

                </div>

                {/* Bottom Device Policy Strip */}
                <div className="mt-2 bg-slate-900 text-white rounded-xl p-2 flex items-center justify-between text-[8px] font-bold">
                  <span className="flex items-center gap-1">
                    <FiShield className="text-emerald-400 w-2.5 h-2.5" />
                    Enforced by Dept. CSE
                  </span>
                  <span className="text-slate-400">v2.4 Live</span>
                </div>

              </div>

            </div>

            {/* Interactive Mode Switcher under Mockup */}
            <div className="mt-4 bg-white rounded-full p-1 border border-slate-200 shadow-md flex items-center space-x-1">
              <button
                onClick={() => setHeroMode('lecture')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  heroMode === 'lecture' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FiLock className="w-3 h-3" />
                <span>Simulate Lecture Hour</span>
              </button>
              <button
                onClick={() => setHeroMode('break')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  heroMode === 'break' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
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
      <section className="relative z-10 -mt-4 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
              
              {/* Telemetry Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                    Live Department Telemetry Stream
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    K.S.R. College of Engineering
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Last Bell Sync: 09:00:00 AM • Next Sync: 10:00:00 AM
                </span>
              </div>

              {/* 4 Impact Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
                {[
                  { value: 480, suffix: '+', label: 'Active Student Devices', sub: 'Autonomous Enforced', icon: <FiUsers />, color: 'text-blue-600 bg-blue-50' },
                  { value: 50, suffix: '+', label: 'Distracting Apps Filtered', sub: 'Gaming & Social Media', icon: <FiSlash />, color: 'text-rose-600 bg-rose-50' },
                  { value: 100, suffix: '%', label: 'Timetable Precision', sub: 'Zero Faculty Overhead', icon: <FiClock />, color: 'text-emerald-600 bg-emerald-50' },
                  { value: 99, suffix: '.8%', label: 'Classroom Engagement', sub: 'Department Verified', icon: <FiShield />, color: 'text-purple-600 bg-purple-50' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center space-y-1.5">
                    <div className={`w-11 h-11 rounded-2xl ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-slate-800 font-bold max-w-[150px] leading-tight">{stat.label}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{stat.sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====================================================
          CORE CAPABILITIES (BENTO GRID ARCHITECTURE)
         ==================================================== */}
      <section id="features" className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiCpu className="w-3 h-3" />
                Institutional Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Engineered for Academic Focus & Integrity
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Complete departmental system connecting timetable schedules, institutional policy, and smartphone security without invading privacy.
              </p>
            </div>
          </SectionReveal>

          {/* 6-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FiClock />,
                badge: 'Zero Manual Work',
                title: 'Automated Timetable Sync',
                desc: 'Maps directly with departmental lecture schedules. Restrictions trigger precisely at the class period bell and unlock during official breaks.',
                color: 'text-blue-600 bg-blue-50 border-blue-100',
              },
              {
                icon: <FiSlash />,
                badge: 'Surgical Filtering',
                title: 'Category-Level App Shield',
                desc: 'Disables Instagram, YouTube Shorts, Snapchat, TikTok, PUBG, Netflix without interrupting LMS, calculators, or educational tools.',
                color: 'text-rose-600 bg-rose-50 border-rose-100',
              },
              {
                icon: <FiEye />,
                badge: 'FERPA & Privacy Compliant',
                title: 'Zero-Surveillance Architecture',
                desc: 'FocusSync never inspects personal chats, gallery photos, or private credentials. It strictly acts as a schedule gatekeeper.',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
              },
              {
                icon: <FiActivity />,
                badge: 'Real-Time Telemetry',
                title: 'Faculty Roster Compliance',
                desc: 'Professors view a live lecture roster confirming student focus compliance, offline warnings, and policy sync per classroom.',
                color: 'text-purple-600 bg-purple-50 border-purple-100',
              },
              {
                icon: <FiPhone />,
                badge: 'Unconditional Safety',
                title: 'Emergency Override & 24/7 Calls',
                desc: 'Direct incoming/outgoing cellular calls remain active 24/7. Students can also request 5-minute academic overrides with faculty signoff.',
                color: 'text-amber-600 bg-amber-50 border-amber-100',
              },
              {
                icon: <FiLock />,
                badge: 'Device Admin Shield',
                title: 'Anti-Tamper & Zero-Bypass',
                desc: 'Secured via hardware-level Device Administrator privilege. Proxy tampering, VPN tunnels, and uninstalls are blocked and logged.',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
              },
            ].map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform ${f.color}`}>
                      {f.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed flex-1">{f.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================
          INTERACTIVE LIVE ENGINE / TIMETABLE SIMULATOR
         ==================================================== */}
      <section id="simulator" className="py-20 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200">
                <FiSliders className="w-3 h-3" />
                Interactive Department Simulator
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Test the Live Enforcer Engine
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Select different classroom timetable periods below to see how FocusSync automatically adjusts device permissions and app accessibility in real-time.
              </p>
            </div>
          </SectionReveal>

          {/* Interactive Simulator Grid */}
          <SectionReveal delay={0.15}>
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Academic Periods Picker */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
                    Department Timetable Schedule
                  </h4>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Dept. of CSE
                  </span>
                </div>

                <div className="space-y-2.5">
                  {periods.map((p, idx) => {
                    const isSelected = activePeriod === idx;
                    return (
                      <button
                        key={p.time}
                        onClick={() => {
                          if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
                          setActivePeriod(idx);
                          setOverrideApproved(false);
                          setOverrideRequested(false);
                        }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-blue-500 shadow-md shadow-blue-600/10 ring-2 ring-blue-500/20'
                            : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-extrabold text-slate-900">{p.time}</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                              p.mode === 'LOCKED' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            }`}>
                              {p.mode === 'LOCKED' ? '🔒 Lecture Lock' : '🟢 Break Time Freedom'}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-700">{p.subject}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{p.room} • {p.faculty}</p>
                        </div>
                        <FiArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Emergency Override Sandbox */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <FiBell className="text-amber-500" />
                      5-Minute Emergency Pass
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">Student Sandbox</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Need temporary access during class for research or family emergency? Test the 1-click request workflow.
                  </p>
                  
                  {overrideApproved ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center">
                      <p className="text-xs font-bold text-emerald-700">✅ 5-Min Emergency Pass Active</p>
                      <p className="text-[10px] text-emerald-600 mt-0.5">Faculty Signed Off • Countdown: 04:58</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleRequestOverride}
                      disabled={overrideRequested}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                    >
                      {overrideRequested ? (
                        <>
                          <FiRefreshCw className="animate-spin w-3 h-3" />
                          <span>Verifying with Faculty Console...</span>
                        </>
                      ) : (
                        <>
                          <FiZap className="w-3 h-3 text-amber-400" />
                          <span>Simulate Emergency Override Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Live App Intercept Sandbox */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      periods[activePeriod].mode === 'LOCKED' && !overrideApproved ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
                    }`} />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                        Simulated Policy: {periods[activePeriod].mode === 'LOCKED' && !overrideApproved ? 'Academic Shield Enforced' : 'Unrestricted Access'}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">{periods[activePeriod].subject} ({periods[activePeriod].room})</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {periods[activePeriod].time}
                  </span>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-blue-900 font-medium">
                  <span className="flex items-center gap-2">
                    <FiInfo className="text-blue-600 w-4 h-4 shrink-0" />
                    Click any application below to simulate what the student experiences:
                  </span>
                </div>

                {/* App Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {appsCatalog.map((app) => {
                    const isAppBlocked = periods[activePeriod].mode === 'LOCKED' && app.status === 'blocked' && !overrideApproved;
                    return (
                      <button
                        key={app.id}
                        onClick={() => handleSimulateAppClick(app)}
                        className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isAppBlocked
                            ? 'bg-rose-50/70 border-rose-200 hover:bg-rose-100/70 text-rose-900'
                            : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/70 text-emerald-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xl">{app.icon}</span>
                          <div>
                            <p className="text-xs font-bold">{app.name}</p>
                            <p className="text-[10px] opacity-75">{app.cat}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          isAppBlocked ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
                        }`}>
                          {isAppBlocked ? '🚫 Blocked' : '✅ Allowed'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Audit Log Terminal */}
                <div className="bg-slate-900 rounded-xl p-3.5 text-[11px] font-mono text-slate-300 flex items-center justify-between shadow-inner">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">[SYNC-ENGINE]</span>
                    <span>
                      {periods[activePeriod].mode === 'LOCKED' && !overrideApproved
                        ? '480 devices locked for lecture session' 
                        : 'All 480 devices unlocked for break session'}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[10px]">0.038s latency</span>
                </div>

              </div>

            </div>
          </SectionReveal>

        </div>
      </section>

      {/* ====================================================
          APP INTERCEPT SIMULATION MODAL
         ==================================================== */}
      <AnimatePresence>
        {simulatedAppModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">{simulatedAppModal.icon}</span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-heading">{simulatedAppModal.name}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">{simulatedAppModal.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSimulatedAppModal(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {simulatedAppModal.isLocked ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
                    <FiSlash />
                  </div>
                  <h4 className="text-sm font-extrabold text-rose-900 font-heading">Application Suspended</h4>
                  <p className="text-xs text-rose-700 leading-relaxed">
                    This application is locked in accordance with the Department Timetable Policy during lecture hours.
                  </p>
                  <div className="bg-white/80 rounded-xl p-2.5 text-[11px] text-slate-700 font-semibold text-left mt-2">
                    <p>• Period: {periods[activePeriod].subject}</p>
                    <p>• Room: {periods[activePeriod].room}</p>
                    <p>• Access Restores: At period interval bell</p>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    <FiCheck />
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-900 font-heading">Application Accessible</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    This tool is fully accessible for academic usage and reference during active sessions.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {simulatedAppModal.desc}
              </p>

              <button
                onClick={() => setSimulatedAppModal(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
              >
                Close Simulator Preview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          WHY FOCUSSYNC: COMPARISON MATRIX
         ==================================================== */}
      <section id="comparison" className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200">
                <FiAward className="w-3 h-3" />
                Institutional Value
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Why Modern Universities Choose FocusSync
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Traditional phone boxes and confiscation waste valuable class time and risk device damage. FocusSync solves digital discipline through intelligent software governance.
              </p>
            </div>
          </SectionReveal>

          {/* Comparison Table */}
          <SectionReveal delay={0.15}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 bg-slate-50/80 text-xs font-extrabold uppercase tracking-wider font-heading">
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
                    <div className="md:col-span-4 p-4 font-bold text-slate-900">{row.metric}</div>
                    <div className="md:col-span-4 p-4 text-slate-600 bg-rose-50/20 border-x border-slate-100 flex items-start gap-2">
                      <FiXSquare className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.oldVal}</span>
                    </div>
                    <div className="md:col-span-4 p-4 text-slate-800 bg-blue-50/20 font-semibold flex items-start gap-2">
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
          MULTI-ROLE INSTITUTIONAL PORTALS
         ==================================================== */}
      <section id="portals" className="py-24 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiUsers className="w-3 h-3" />
                Institutional Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Dedicated Multi-Role Portals
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Log into your personalized dashboard with secure K.S.R. institutional credentials.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Student Portal Card */}
            <SectionReveal delay={0.1}>
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-5 font-bold group-hover:scale-110 transition-transform">
                    <FiSmartphone />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Student Portal</h3>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    View active lecture restrictions, check personal timetable sync status, verify device health, and submit emergency override passes.
                  </p>
                  <div className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Active Schedule & Bell Counter</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Allowed Educational App Inventory</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> 5-Minute Emergency Pass Request</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/student/login')}
                  className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-blue-600/20"
                >
                  <span>Student Login</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </SectionReveal>

            {/* Faculty Portal Card */}
            <SectionReveal delay={0.2}>
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-slate-50 p-8 rounded-3xl border-2 border-emerald-500/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-full relative group"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                    Classroom Control
                  </span>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-5 font-bold group-hover:scale-110 transition-transform">
                    <FiUsers />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Faculty & Staff Portal</h3>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    Live classroom compliance monitoring, student roster tracking, broadcast emergency alerts, and manual lecture session overrides.
                  </p>
                  <div className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Live Classroom Focus Telemetry</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> One-Click Lecture Session Overrides</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Tamper & Disconnect Instant Alerts</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/staff/login')}
                  className="mt-8 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-emerald-600/20"
                >
                  <span>Faculty & Staff Login</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </SectionReveal>

            {/* Admin Panel Card */}
            <SectionReveal delay={0.3}>
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-5 font-bold group-hover:scale-110 transition-transform">
                    <FiShield />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Admin & HOD Console</h3>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    Department policy rules, academic timetable synchronization, device audit logs, staff management, and system telemetry.
                  </p>
                  <div className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Department Master Policy Rules</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Timetable Database Bulk Sync</div>
                    <div className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Audit Logs & Accreditation Reports</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/admin/login')}
                  className="mt-8 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-purple-600/20"
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
          CAMPUS PRIVACY & SECURITY ARCHITECTURE
         ==================================================== */}
      <section className="py-20 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiLock className="w-3 h-3" />
                Privacy Safeguard
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                100% Zero-Surveillance Architecture
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                FocusSync is built strictly as an academic schedule enforcer, not a spyware tool.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                <FiEye />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">No Chat or Media Access</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The enforcer operates at the OS package launcher level. It cannot read text messages, view gallery photos, inspect camera feeds, or log keystrokes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                <FiDatabase />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">Zero Location Tracking</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Campus geofencing verifies connection to authorized department Wi-Fi BSSID identifiers without actively recording student GPS coordinates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
                <FiShield />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">Institutional Encryption</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All telemetry data between student devices and the department server is secured via TLS 1.3 encryption and institutional tokens.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          FREQUENTLY ASKED QUESTIONS (ACCORDION WITH CATEGORY)
         ==================================================== */}
      <section id="faq" className="py-20 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <SectionReveal>
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                <FiHelpCircle className="w-3 h-3" />
                Institutional FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Everything students and faculty need to know about schedule rules, safety, and privacy.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'privacy', label: 'Privacy & Security' },
                { id: 'operations', label: 'Classroom Operations' },
                { id: 'technical', label: 'Device & Battery' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleFaqCategoryChange(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    faqCategory === c.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                <SectionReveal key={faq.q} delay={idx * 0.05}>
                  <div className="bg-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 flex items-center justify-between cursor-pointer font-heading font-bold text-sm text-slate-900 hover:bg-slate-100/60 transition-colors"
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
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-200/60 pt-3"
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
      <section className="py-20 bg-slate-50 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
              
              {/* Radial Accent Glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 mx-auto border border-white/20 shadow-xs flex items-center justify-center">
                  <img src={logo} alt="FocusSync" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
                  Empowering 100% Focused Classrooms Across Campus
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  FocusSync is actively running across the Department of Computer Science & Engineering at K.S.R. College of Engineering (Autonomous).
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>Sign In to Institutional Portal</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollToSection('simulator')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <FiSliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test Policy Simulator</span>
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
        className="bg-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-blue-900"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white border border-blue-200 p-1 rounded-xl flex items-center justify-center shadow-xs">
                <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                Focus<span className="text-emerald-400">Sync</span>
              </span>
            </div>
            <p className="text-xs font-medium text-blue-100 max-w-sm leading-relaxed">
              Smart Classroom Mobile Usage Governance & Enforcer System. Developed for the Department of Computer Science & Engineering, K.S.R. College of Engineering (Autonomous), Tiruchengode.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-blue-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All 12 Lecture Halls & Labs Synchronized</span>
            </div>
          </div>

          {/* Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Portals & Login</h4>
            <ul className="space-y-2 text-sm font-semibold text-blue-100">
              <li><Link to="/student/login" className="hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link to="/staff/login" className="hover:text-white transition-colors">Faculty & Staff Portal</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin & HOD Console</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Unified Login Hub</Link></li>
            </ul>
          </div>

          {/* Department Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Department Address</h4>
            <p className="text-sm font-semibold text-white">Dept. of Computer Science & Engineering</p>
            <p className="text-xs text-blue-100 leading-relaxed">K.S.R. College of Engineering (Autonomous), K.S.R. Kalvi Nagar, Tiruchengode – 637 215, Tamil Nadu, India.</p>
            <p className="text-xs font-bold text-blue-200 mt-1">hodcse@ksrce.ac.in • support@focussync.edu</p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-blue-700/60 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-blue-100">
          <p>© 2026 FocusSync System. K.S.R. College of Engineering. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-semibold">
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
