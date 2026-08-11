import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiSmartphone, 
  FiActivity, 
  FiClock, 
  FiShield, 
  FiCheckCircle, 
  FiUsers, 
  FiLock, 
  FiCpu, 
  FiServer,
  FiChevronRight,
  FiZap,
  FiBarChart2
} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import schoolIllustration from '../../assets/school_illustration.png';

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Background Gradient Circles */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[700px] h-[700px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ==========================================
          STICKY HEADER
         ========================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-blue-900 leading-none">
                Focus<span className="text-emerald-500">Sync</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                Dept Mobile Controller
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollToSection('why-focussync')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Why FocusSync
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Login CTA Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Sign In</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          HERO SECTION (TWO COLUMN DESKTOP LAYOUT)
         ========================================== */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Stay Focused. Learn Better.</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">Smart Classroom System</span>
            </div>

            {/* Big Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Smart Classroom <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-500 bg-clip-text text-transparent">
                Mobile Usage
              </span> <br />
              Control System
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              FocusSync helps educational institutions monitor, manage, and automate mobile usage restrictions during academic hours with real-time monitoring, scheduled restrictions, and intelligent classroom control.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 flex items-center justify-center space-x-3 transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <FiArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('features')}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-base border border-slate-300 shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <FiChevronRight className="w-4 h-4 text-slate-500" />
              </motion.button>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Real-Time Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Department Controlled</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Automated Schedule</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT ILLUSTRATION COLUMN WITH FLOATING UI CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Background Glow Ring */}
            <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-blue-500/20 to-emerald-400/20 rounded-full blur-2xl -z-10 animate-pulse" />

            {/* Large School Illustration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md sm:max-w-lg"
            >
              <img
                src={schoolIllustration}
                alt="FocusSync School Classroom Illustration"
                className="w-full h-auto object-contain filter drop-shadow-2xl"
              />
            </motion.div>

            {/* FLOATING CARD 1: Restriction Active (Top Left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -left-4 sm:top-2 sm:-left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <FiShield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-xs font-extrabold text-slate-900">Restriction Active</p>
                </div>
                <p className="text-[11px] font-semibold text-slate-500">09:00 AM – 04:00 PM</p>
              </div>
            </motion.div>

            {/* FLOATING CARD 2: Students Online (Top Right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-10 -right-2 sm:-right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FiUsers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">480 Students</p>
                <p className="text-[11px] font-semibold text-emerald-600 flex items-center space-x-1">
                  <FiCheckCircle className="w-3 h-3" />
                  <span>Monitored Online</span>
                </p>
              </div>
            </motion.div>

            {/* FLOATING CARD 3: Today's Schedule (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <FiClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Academic Session</p>
                <p className="text-[11px] font-semibold text-slate-500">Auto Restrictions Active</p>
              </div>
            </motion.div>

            {/* FLOATING CARD 4: Real-time Monitoring (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-6 -right-2 sm:bottom-0 sm:-right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <FiActivity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Live Heartbeat</p>
                <p className="text-[11px] font-semibold text-rose-600">Violations Filtered</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ==========================================
          FEATURE SECTION
         ========================================== */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider">
              Core Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed for Educational Excellence
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Comprehensive tools empowering faculty and protecting student academic focus during class hours.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-slate-50/80 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                <FiSmartphone />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mobile Usage Control</h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Restrict non-essential mobile applications like social media, gaming, and streaming automatically during lecture hours.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-slate-50/80 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25">
                <FiActivity />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Real-Time Monitoring</h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Live dashboard for staff and HODs tracking active device compliance, policy sync, and attempt violation logs.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-slate-50/80 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-amber-500/25">
                <FiClock />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Smart Scheduling</h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Automated restriction windows (09:00 AM – 04:00 PM) synchronized with department timetables and academic calendars.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-slate-50/80 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25">
                <FiShield />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Department Security</h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Multi-tier role access control for Students, Faculty Class Advisors, and Department Head Administrators.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          WHY FOCUSSYNC SECTION
         ========================================== */}
      <section id="why-focussync" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Title & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              Institutional Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Top Departments Choose FocusSync
            </h2>
            <p className="text-base text-slate-600 font-medium leading-relaxed">
              FocusSync replaces manual phone collection with an automated, respectful, and digitally enforced academic environment.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Access Department Portal</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Icon + Text Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Item 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <FiBarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Department-wise Control</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  HODs can broadcast policy updates or trigger manual class overrides instantly.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <FiUsers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Live Student Status</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  Class advisors get immediate visibility into active student sessions and violations.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                <FiZap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Automated Restrictions</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  Seamless background enforcement without requiring constant manual intervention.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                <FiLock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Secure Authentication</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  Institutional email login with encrypted tokens and role protection across all portals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          CALL TO ACTION (CTA)
         ========================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-white/20 uppercase tracking-wider">
              Get Started Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Modernize Your Classroom?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
              Launch the FocusSync Department Mobile Controller to log in as a Student, Staff Advisor, or Department HOD Admin.
            </p>

            <div className="pt-4 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 flex items-center space-x-3 transition-all cursor-pointer"
              >
                <span>Launch FocusSync</span>
                <FiArrowRight className="w-5 h-5 text-slate-950" />
              </motion.button>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          FOOTER
         ========================================== */}
      <footer id="contact" className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 p-1 shadow-xs flex items-center justify-center">
                <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-blue-900">
                Focus<span className="text-emerald-500">Sync</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 max-w-sm leading-relaxed">
              Smart Classroom Mobile Usage Control System. Departmental digital discipline platform designed for engineering and degree colleges.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Quick Portals</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <Link to="/student/login" className="hover:text-blue-600 transition-colors">Student Portal</Link>
              </li>
              <li>
                <Link to="/staff/login" className="hover:text-blue-600 transition-colors">Staff Advisor Portal</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-blue-600 transition-colors">HOD Admin Panel</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Contact & Support</h4>
            <p className="text-xs font-semibold text-slate-600">Department of Computer Science & Engineering</p>
            <p className="text-xs font-medium text-slate-500">KSR College of Engineering</p>
            <p className="text-xs font-bold text-blue-600 mt-1">support@focussync.edu</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-400">
          <p>© 2026 FocusSync System. Department Mobile Controller. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>v1.0.0 Web Edition</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GetStartedPage;
