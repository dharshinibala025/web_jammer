import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSmartphone, 
  FiActivity, 
  FiClock, 
  FiShield, 
  FiUsers, 
  FiLock, 
  FiZap,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiArrowRight,
  FiCheck,
  FiMenu,
  FiX
} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import MagicRings from '../../components/MagicRings';

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const isNearFooter = (window.scrollY + windowHeight) >= (fullHeight - 500);
      setAtBottom(isNearFooter);

      const navItems = ['home', 'features', 'why-focussync', 'portals', 'contact'];
      const scrollPos = window.scrollY + 200;

      if (window.scrollY < 150) {
        setActiveSection('home');
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i];
        if (id === 'home') continue;
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative z-0">
      
      {/* Background WebGL Magic Rings Canvas (Subtle & Elegant) */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-45">
        <MagicRings
          color="#93c5fd"
          colorTwo="#3b82f6"
          ringCount={5}
          speed={0.6}
          attenuation={11}
          lineThickness={1.4}
          baseRadius={0.42}
          radiusStep={0.13}
          scaleRate={0.07}
          opacity={0.4}
          blur={1}
          noiseAmount={0.01}
          rotation={0}
          ringGap={1.4}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.12}
          hoverScale={1.08}
          parallax={0.03}
        />
      </div>

      {/* Ambient Soft Radial Mesh Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-glow-light-blue pointer-events-none -z-10 rounded-full blur-3xl opacity-60"></div>
      <div className="fixed bottom-1/3 right-10 w-[500px] h-[400px] bg-glow-light-emerald pointer-events-none -z-10 rounded-full blur-3xl opacity-50"></div>

      {/* ==========================================
          FLOATING PILL NAVBAR
         ========================================== */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`pointer-events-auto max-w-6xl w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/10 text-slate-900'
              : 'bg-white/80 backdrop-blur-lg border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:bg-white/90 text-slate-900'
          }`}
        >
          {/* Logo & Brand Pill Badge */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="flex items-center space-x-2.5 group px-3 py-1.5 rounded-full border transition-all cursor-pointer bg-slate-100/80 hover:bg-slate-100 border-slate-200/70"
          >
            <div className="w-8 h-8 rounded-full p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs bg-white border border-slate-200/80">
              <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center space-x-1.5 pr-1">
              <span className="text-base font-extrabold tracking-tight leading-none font-heading text-slate-900">
                Focus<span className="text-emerald-500">Sync</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Enforcer
              </span>
            </div>
          </Link>

          {/* Navigation Links inside Central Pill Bar */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full border shadow-xs space-x-1 relative transition-colors duration-500 bg-slate-100/80 border-slate-200/70">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'why-focussync', label: 'Why FocusSync' },
              { id: 'portals', label: 'Portals' },
              { id: 'contact', label: 'Contact' },
            ].map((navItem) => {
              const isActive = activeSection === navItem.id;
              return (
                <button
                  key={navItem.id}
                  onClick={() => {
                    if (navItem.id === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      scrollToSection(navItem.id);
                    }
                    setActiveSection(navItem.id);
                  }}
                  className={`relative px-4 py-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="landingNavbarPill"
                      className="absolute inset-0 rounded-full shadow-xs -z-10 bg-white border border-slate-200/80"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Button Pill & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 sm:px-5 py-2 text-xs font-extrabold rounded-full shadow-md transition-all cursor-pointer flex items-center space-x-2 border bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-blue-500/30 shadow-blue-600/25"
            >
              <span>Access Portal</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FiX className="w-4.5 h-4.5" /> : <FiMenu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Dropdown Pill Container */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-16 inset-x-4 pointer-events-auto rounded-3xl p-4 border shadow-2xl space-y-1.5 text-center bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'why-focussync', label: 'Why FocusSync' },
              { id: 'portals', label: 'Portals' },
              { id: 'contact', label: 'Contact' },
            ].map((navItem) => (
              <button
                key={navItem.id}
                onClick={() => {
                  if (navItem.id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    scrollToSection(navItem.id);
                  }
                  setActiveSection(navItem.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeSection === navItem.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {navItem.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* ==========================================
          HERO SECTION WITH MOBILE MOCKUP
         ========================================== */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Capsule */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>KSR College of Engineering • Dept. of CSE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.14] font-heading">
              Smart Classroom <br />
              <span className="text-blue-600">Mobile Usage</span> <span className="text-emerald-500">Control</span> <br />
              System.
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              FocusSync helps educational institutions monitor, manage, and automate mobile usage restrictions during academic hours. Ensure digital discipline with real-time tracking and automated schedules.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 bg-white text-slate-700 font-bold text-sm rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
              >
                Learn More
              </motion.button>
            </div>

            {/* Metrics Divider */}
            <div className="pt-6 border-t border-slate-200/80 flex items-center space-x-8 text-left">
              <div>
                <p className="text-2xl font-extrabold text-slate-900 font-heading">480</p>
                <p className="text-xs font-semibold text-slate-500">Online Students</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-500 font-heading">Active</p>
                <p className="text-xs font-semibold text-slate-500">Status Control</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-extrabold text-blue-600 font-heading">99%</p>
                <p className="text-xs font-semibold text-slate-500">Policy Sync</p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: ELEGANT SMARTPHONE SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative w-[300px] h-[590px] bg-white rounded-[45px] shadow-2xl shadow-blue-900/15 border-4 border-slate-200 p-3 flex flex-col z-20"
            >
              
              {/* Phone Top Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30 pointer-events-none">
                <div className="w-24 h-4 bg-slate-100 rounded-b-xl flex items-center justify-center space-x-2 border-b border-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="w-8 h-1 rounded-full bg-slate-300"></div>
                </div>
              </div>

              {/* Phone Home Indicator Button */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-12 h-12 rounded-full border-2 border-slate-200 bg-slate-50"></div>
              </div>

              {/* Inner Screen Content */}
              <div className="relative w-full h-[calc(100%-60px)] mt-2 bg-slate-50 rounded-md overflow-hidden flex flex-col border border-slate-100">
                
                {/* Screen Header */}
                <div className="h-40 bg-white flex flex-col items-center justify-center pt-4 border-b border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 mb-2 shadow-xs flex items-center justify-center">
                    <img src={logo} alt="FocusSync" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-slate-900 font-extrabold text-sm tracking-tight font-heading">FocusSync</h3>
                  <p className="text-slate-500 text-[10px] font-semibold">Academic Enforcer</p>
                </div>
                
                {/* Stats Bar */}
                <div className="grid grid-cols-3 bg-slate-200 gap-px text-center border-b border-slate-200">
                  <div className="bg-white py-3">
                    <p className="text-blue-600 font-extrabold text-sm font-heading">480</p>
                    <p className="text-slate-500 text-[9px] font-semibold uppercase mt-0.5">Online</p>
                  </div>
                  <div className="bg-white py-3">
                    <p className="text-emerald-500 font-extrabold text-sm font-heading">Active</p>
                    <p className="text-slate-500 text-[9px] font-semibold uppercase mt-0.5">Status</p>
                  </div>
                  <div className="bg-white py-3">
                    <p className="text-blue-600 font-extrabold text-sm font-heading">99%</p>
                    <p className="text-slate-500 text-[9px] font-semibold uppercase mt-0.5">Sync</p>
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="flex-1 bg-slate-100 grid grid-cols-3 gap-px p-px">
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiShield className="w-5 h-5 mb-1 text-blue-600" />
                    <span className="text-[8px] font-bold">Policy</span>
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiUsers className="w-5 h-5 mb-1 text-emerald-500" />
                    <span className="text-[8px] font-bold">Students</span>
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiActivity className="w-5 h-5 mb-1 text-purple-600" />
                    <span className="text-[8px] font-bold">Monitor</span>
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiClock className="w-5 h-5 mb-1 text-amber-500" />
                    <span className="text-[8px] font-bold">Schedule</span>
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiBarChart2 className="w-5 h-5 mb-1 text-blue-600" />
                    <span className="text-[8px] font-bold">Reports</span>
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-2">
                    <FiLock className="w-5 h-5 mb-1 text-rose-500" />
                    <span className="text-[8px] font-bold">Overrides</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          FLOATING FEATURE BADGES STRIP
         ========================================== */}
      <div className="max-w-4xl mx-auto relative -mt-24 z-30 hidden md:block">
        <div className="flex justify-center space-x-12">
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            whileHover={{ y: -4 }}
            className="w-28 h-28 rounded-full border-4 border-white bg-white flex flex-col items-center justify-center text-slate-900 shadow-xl shadow-slate-200/60"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
              <FiShield className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold font-heading">Secure</span>
            <span className="text-[10px] text-slate-500 font-medium">Auth</span>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            whileHover={{ y: -4 }}
            className="w-32 h-32 rounded-full border-4 border-white bg-white flex flex-col items-center justify-center text-slate-900 shadow-xl shadow-slate-200/60 -translate-y-4"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
              <FiClock className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold font-heading">Automated</span>
            <span className="text-xs text-slate-500 font-medium">Schedule</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            whileHover={{ y: -4 }}
            className="w-28 h-28 rounded-full border-4 border-white bg-white flex flex-col items-center justify-center text-slate-900 shadow-xl shadow-slate-200/60"
          >
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1">
              <FiActivity className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold font-heading">Real-Time</span>
            <span className="text-[10px] text-slate-500 font-medium">Tracking</span>
          </motion.div>
          
        </div>
      </div>

      {/* ==========================================
          FEATURES SECTION
         ========================================== */}
      <section id="features" className="py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Designed for Excellence
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-base text-slate-500 font-medium pt-2">
              Comprehensive tools empowering faculty and protecting student academic focus during class hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FiSmartphone />} 
              title="Usage Control" 
              desc="Restrict non-essential mobile applications like social media during lecture hours." 
              colorClass="text-blue-600 bg-blue-50 border-blue-100"
            />
            <FeatureCard 
              icon={<FiActivity />} 
              title="Live Monitor" 
              desc="Live dashboard tracking active device compliance and policy sync." 
              colorClass="text-emerald-500 bg-emerald-50 border-emerald-100"
            />
            <FeatureCard 
              icon={<FiClock />} 
              title="Smart Schedule" 
              desc="Automated restriction windows synchronized with department timetables." 
              colorClass="text-amber-500 bg-amber-50 border-amber-100"
            />
            <FeatureCard 
              icon={<FiShield />} 
              title="Dept Security" 
              desc="Multi-tier role access control for Students, Advisors, and HODs." 
              colorClass="text-purple-600 bg-purple-50 border-purple-100"
            />
          </div>

        </div>
      </section>

      {/* ==========================================
          WHY FOCUSSYNC SECTION
         ========================================== */}
      <section id="why-focussync" className="py-20 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
                Why Departments Choose Us
              </h2>
              <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                FocusSync replaces manual phone collection with an automated, respectful, and digitally enforced academic environment.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all mt-4 cursor-pointer"
              >
                Access Portal
              </motion.button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <WhyCard icon={<FiBarChart2 />} title="Department Control" desc="HODs can broadcast updates or trigger manual class overrides instantly." colorClass="text-blue-600 bg-blue-50" />
              <WhyCard icon={<FiUsers />} title="Live Status" desc="Immediate visibility into active student sessions and violations." colorClass="text-emerald-600 bg-emerald-50" />
              <WhyCard icon={<FiZap />} title="Auto Enforce" desc="Seamless background enforcement without manual intervention." colorClass="text-amber-600 bg-amber-50" />
              <WhyCard icon={<FiLock />} title="Secure Auth" desc="Institutional email login with encrypted tokens." colorClass="text-purple-600 bg-purple-50" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PORTAL SELECTION CARDS
         ========================================== */}
      <section id="portals" className="py-20 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Access Institutional Portals
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Select your role to sign into your customized department workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-5">
                  <FiSmartphone />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Student Portal</h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  View active timetable restrictions, device sync state, and submit emergency override requests.
                </p>
              </div>
              <button
                onClick={() => navigate('/student/login')}
                className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Student Login</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-5">
                  <FiUsers />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Faculty Portal</h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Live classroom compliance tracking, student rosters, broadcast updates, and lecture overrides.
                </p>
              </div>
              <button
                onClick={() => navigate('/staff/login')}
                className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Staff Login</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-5">
                  <FiShield />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Admin Panel</h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Department policy rules, timetable synchronization, device logs, and system configuration.
                </p>
              </div>
              <button
                onClick={() => navigate('/admin/login')}
                className="mt-6 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Admin Login</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER (#2563eb BLUE BACKGROUND)
         ========================================== */}
      <footer 
        id="contact" 
        style={{ backgroundColor: '#2563eb' }}
        className="text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white border border-blue-200 p-1 rounded-xl flex items-center justify-center shadow-xs">
                <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                Focus<span className="text-emerald-300">Sync</span>
              </span>
            </div>
            <p className="text-xs font-medium text-blue-100 max-w-sm leading-relaxed">
              Smart Classroom Mobile Usage Control System. Departmental digital discipline platform designed for engineering and degree colleges.
            </p>
          </div>

          {/* Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Quick Portals</h4>
            <ul className="space-y-2 text-sm font-semibold text-blue-100">
              <li><Link to="/student/login" className="hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link to="/staff/login" className="hover:text-white transition-colors">Staff Portal</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Contact</h4>
            <p className="text-sm font-semibold text-white">Dept. of CSE</p>
            <p className="text-xs text-blue-100">KSR College of Engineering</p>
            <p className="text-sm font-bold text-white mt-1">support@focussync.edu</p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-blue-400/40 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-blue-100">
          <p>© 2026 FocusSync System. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-semibold">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, desc, colorClass }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${colorClass}`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading">{title}</h3>
    <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">{desc}</p>
  </motion.div>
);

const WhyCard = ({ icon, title, desc, colorClass }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 flex items-start space-x-4"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-900 font-heading">{title}</h4>
      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default GetStartedPage;
