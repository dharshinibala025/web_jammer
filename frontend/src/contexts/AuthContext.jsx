import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { getStaffProfile } from '../services/staffMockData';
import mockData from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session && session.user) {
          setUser(session.user);
          setRole(session.user.role || 'student');
        } else {
          // Default initial mock session for quick preview
          setUser(mockData.student);
          setRole('student');
        }
      } catch (err) {
        setUser(mockData.student);
        setRole('student');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password, selectedRole = 'student') => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      let activeUser = result.user;
      // Prefer the role explicitly selected on the login form so
      // the UI-driven choice (student/staff/admin) navigates correctly
      // even when the backend/mock returns a different role.
      const finalRole = selectedRole || activeUser?.role || 'student';
      
      if (finalRole === 'staff') {
        activeUser = getStaffProfile(email);
      } else if (finalRole === 'admin') {
        activeUser = {
          name: 'HOD / Department Admin',
          initials: 'AD',
          email: email || 'admin@ksrce.ac.in',
          role: 'admin',
          department: 'Computer Science and Engineering',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        };
      } else {
        activeUser = mockData.student;
      }

      setUser(activeUser);
      setRole(finalRole);
      return { success: true, role: finalRole };
    } catch (err) {
      // Fallback
      setRole(selectedRole);
      setUser(selectedRole === 'staff' ? getStaffProfile(email) : mockData.student);
      return { success: true, role: selectedRole };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setRole('student');
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
