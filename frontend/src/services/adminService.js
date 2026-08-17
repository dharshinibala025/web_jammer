/**
 * Admin Service & LocalStorage Store
 * Exclusively for Computer Science and Engineering (CSE) Department
 */

const STORAGE_KEYS = {
  STUDENTS: '@focussync_cse_admin_students',
  STAFF: '@focussync_cse_admin_staff',
  SECTIONS: '@focussync_cse_admin_sections_v2',
  APPLICATIONS: '@focussync_cse_admin_apps',
  NOTIFICATIONS: '@focussync_cse_admin_notifications',
  SETTINGS: '@focussync_cse_admin_settings',
};

const DEFAULT_STUDENTS = [
  { id: '1', registerNumber: '21CS001', name: 'Ajith Kumar R', year: '4th Year', section: 'A', department: 'CSE', email: 'ajith.r@ksrce.ac.in', phone: '9876543210', status: 'Active' },
  { id: '2', registerNumber: '21CS014', name: 'Divya S', year: '4th Year', section: 'A', department: 'CSE', email: 'divya.s@ksrce.ac.in', phone: '9876543211', status: 'Blocked' },
  { id: '3', registerNumber: '21CS028', name: 'Hariharan B', year: '4th Year', section: 'B', department: 'CSE', email: 'hari.b@ksrce.ac.in', phone: '9876543212', status: 'Active' },
  { id: '4', registerNumber: '22CS001', name: 'Adithya K', year: '3rd Year', section: 'A', department: 'CSE', email: 'adithya.k@ksrce.ac.in', phone: '9876543213', status: 'Active' },
  { id: '5', registerNumber: '22CS008', name: 'Bala J', year: '3rd Year', section: 'A', department: 'CSE', email: 'bala.j@ksrce.ac.in', phone: '9876543214', status: 'Blocked' },
  { id: '6', registerNumber: '22CS015', name: 'Dharshini B', year: '3rd Year', section: 'B', department: 'CSE', email: 'dharshini.b@ksrce.ac.in', phone: '9876543215', status: 'Active' },
  { id: '7', registerNumber: '23CS005', name: 'Gokul V', year: '2nd Year', section: 'A', department: 'CSE', email: 'gokul.v@ksrce.ac.in', phone: '9876543216', status: 'Active' },
  { id: '8', registerNumber: '23CS019', name: 'Kaviya P', year: '2nd Year', section: 'B', department: 'CSE', email: 'kaviya.p@ksrce.ac.in', phone: '9876543217', status: 'Active' },
  { id: '9', registerNumber: '24CS002', name: 'Logesh M', year: '1st Year', section: 'A', department: 'CSE', email: 'logesh.m@ksrce.ac.in', phone: '9876543218', status: 'Active' },
  { id: '10', registerNumber: '24CS011', name: 'Nivedha R', year: '1st Year', section: 'B', department: 'CSE', email: 'nivedha.r@ksrce.ac.in', phone: '9876543219', status: 'Active' },
];

const DEFAULT_STAFF = [
  { id: '1', staffId: 'CSE-ST-101', name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@ksrce.ac.in', designation: 'HOD & Professor', department: 'CSE', phone: '9443322110', status: 'Active', year: '4th Year', section: 'A', advisorType: 'CA1' },
  { id: '2', staffId: 'CSE-ST-102', name: 'Prof. Priya Nair', email: 'priya.nair@ksrce.ac.in', designation: 'Assistant Professor', department: 'CSE', phone: '9443322111', status: 'Active', year: '3rd Year', section: 'A', advisorType: 'CA1' },
  { id: '3', staffId: 'CSE-ST-103', name: 'Prof. Anil Kumar', email: 'anil.kumar@ksrce.ac.in', designation: 'Associate Professor', department: 'CSE', phone: '9443322112', status: 'Active', year: '2nd Year', section: 'B', advisorType: 'CA2' },
  { id: '4', staffId: 'CSE-ST-104', name: 'Prof. Divya Francis', email: 'divya.francis@ksrce.ac.in', designation: 'Assistant Professor', department: 'CSE', phone: '9443322113', status: 'On Leave', year: '1st Year', section: 'C', advisorType: 'CA3' },
  { id: '5', staffId: 'CSE-ST-105', name: 'Prof. Suresh V', email: 'suresh.v@ksrce.ac.in', designation: 'Assistant Professor', department: 'CSE', phone: '9443322114', status: 'Active', year: '3rd Year', section: 'B', advisorType: 'CA2' },
  { id: '6', staffId: 'CSE-ST-106', name: 'Prof. Kavitha M', email: 'kavitha.m@ksrce.ac.in', designation: 'Assistant Professor', department: 'CSE', phone: '9443322115', status: 'Active', year: '1st Year', section: 'A', advisorType: 'CA1' },
];

// Year-wise Sections structure
const DEFAULT_SECTIONS = {
  '1st Year': ['A', 'B', 'C', 'D'],
  '2nd Year': ['A', 'B', 'C', 'D'],
  '3rd Year': ['A', 'B', 'C', 'D'],
  '4th Year': ['A', 'B', 'C', 'D'],
};

const DEFAULT_APPLICATIONS = [
  { id: '1', name: 'Instagram', category: 'Social Media', isBlocked: true },
  { id: '2', name: 'YouTube', category: 'Video Streaming', isBlocked: true },
  { id: '3', name: 'WhatsApp', category: 'Messaging', isBlocked: false },
  { id: '4', name: 'Facebook', category: 'Social Media', isBlocked: true },
  { id: '5', name: 'Games', category: 'Gaming', isBlocked: true },
];

const DEFAULT_NOTIFICATIONS = [
  { id: '1', title: 'Batch Excel Imported', message: 'Student records uploaded successfully for CSE 1st Year Section A.', time: '10 mins ago', isRead: false },
  { id: '2', title: 'Staff Profile Added', message: 'Dr. Rajesh Kumar added as CSE Department Admin.', time: '1 hour ago', isRead: false },
  { id: '3', title: 'Section List Updated', message: 'Year-wise sections configured for CSE Department.', time: 'Yesterday', isRead: true },
  { id: '4', title: 'Application Rules Toggled', message: 'YouTube restriction updated by Admin.', time: '2 days ago', isRead: true },
];

const DEFAULT_SETTINGS = {
  department: 'Computer Science and Engineering (CSE)',
  adminEmail: 'admin@ksrce.ac.in',
  adminName: 'Admin',
  emailNotifications: true,
  dashboardAutoRefresh: true,
  autoBlockSchedule: '09:00 AM - 04:00 PM',
};

class AdminService {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- Students ---
  getStudents() {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : DEFAULT_STUDENTS;
  }

  saveStudents(students) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    this.notify();
  }

  addStudent(student) {
    const students = this.getStudents();
    const newStudent = {
      ...student,
      id: Date.now().toString(),
      department: 'CSE',
    };
    const updated = [newStudent, ...students];
    this.saveStudents(updated);
    this.addNotification('New Student Added', `${newStudent.name} (${newStudent.registerNumber}) registered under ${newStudent.year} Section ${newStudent.section}.`);
    return newStudent;
  }

  updateStudent(id, updatedFields) {
    const students = this.getStudents();
    const updated = students.map((s) => (s.id === id ? { ...s, ...updatedFields, department: 'CSE' } : s));
    this.saveStudents(updated);
  }

  deleteStudent(id) {
    const students = this.getStudents();
    const updated = students.filter((s) => s.id !== id);
    this.saveStudents(updated);
  }

  importStudents(newStudentArray) {
    const students = this.getStudents();
    const formatted = newStudentArray.map((s, index) => ({
      id: (Date.now() + index).toString(),
      registerNumber: s.registerNumber || s['Register Number'] || `24CS${String(index + 100).padStart(3, '0')}`,
      name: s.name || s['Name'] || 'Student',
      year: s.year || s['Year'] || '1st Year',
      section: s.section || s['Section'] || 'A',
      department: 'CSE',
      email: s.email || s['Email'] || 'student@ksrce.ac.in',
      phone: s.phone || s['Phone'] || '9876543210',
      status: s.status || s['Device Status'] || 'Active',
    }));
    const updated = [...formatted, ...students];
    this.saveStudents(updated);
    this.addNotification('Batch Excel Import Successful', `${formatted.length} CSE student records imported.`);
    return formatted.length;
  }

  // --- Staff ---
  getStaff() {
    const data = localStorage.getItem(STORAGE_KEYS.STAFF);
    return data ? JSON.parse(data) : DEFAULT_STAFF;
  }

  saveStaff(staffList) {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffList));
    this.notify();
  }

  addStaff(staffMember) {
    const staffList = this.getStaff();
    const newStaff = {
      ...staffMember,
      id: Date.now().toString(),
      department: 'CSE',
    };
    const updated = [newStaff, ...staffList];
    this.saveStaff(updated);
    this.addNotification('New Staff Added', `${newStaff.name} (${newStaff.staffId}) added to CSE Faculty.`);
    return newStaff;
  }

  updateStaff(id, updatedFields) {
    const staffList = this.getStaff();
    const updated = staffList.map((s) => (s.id === id ? { ...s, ...updatedFields, department: 'CSE' } : s));
    this.saveStaff(updated);
  }

  deleteStaff(id) {
    const staffList = this.getStaff();
    const updated = staffList.filter((s) => s.id !== id);
    this.saveStaff(updated);
  }

  importStaff(newStaffArray) {
    const staffList = this.getStaff();
    const formatted = newStaffArray.map((s, index) => ({
      id: (Date.now() + index).toString(),
      staffId: s.staffId || s['Staff ID'] || s['ID'] || `STF${String(index + 100).padStart(3, '0')}`,
      name: s.name || s['Name'] || 'Faculty Member',
      designation: s.designation || s['Designation'] || 'Assistant Professor',
      advisorType: s.advisorType || s['Advisor Type'] || 'CA1',
      year: s.year || s['Year'] || '1st Year',
      section: s.section || s['Section'] || 'A',
      department: 'CSE',
      email: s.email || s['Email'] || 'faculty@ksrce.ac.in',
      phone: s.phone || s['Phone'] || '9876543210',
    }));
    const updated = [...formatted, ...staffList];
    this.saveStaff(updated);
    this.addNotification('Batch Faculty Import Successful', `${formatted.length} CSE faculty member records imported.`);
    return formatted.length;
  }

  // --- Year-Wise Sections ---
  getSections(year) {
    const raw = localStorage.getItem(STORAGE_KEYS.SECTIONS);
    const sectionsObj = raw ? JSON.parse(raw) : DEFAULT_SECTIONS;
    if (year) {
      return sectionsObj[year] || ['A', 'B', 'C', 'D'];
    }
    return sectionsObj;
  }

  saveSections(sectionsObj) {
    localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sectionsObj));
    this.notify();
  }

  addSection(year, sectionName) {
    const cleanName = sectionName.trim().toUpperCase();
    if (!cleanName || !year) return false;
    const sectionsObj = { ...this.getSections() };
    const yearSections = sectionsObj[year] ? [...sectionsObj[year]] : ['A', 'B', 'C', 'D'];

    if (yearSections.includes(cleanName)) return false;

    yearSections.push(cleanName);
    yearSections.sort();
    sectionsObj[year] = yearSections;
    this.saveSections(sectionsObj);
    this.addNotification('Section Created', `Section ${cleanName} added to ${year}.`);
    return true;
  }

  removeSection(year, sectionName) {
    const sectionsObj = { ...this.getSections() };
    if (!sectionsObj[year]) return;

    sectionsObj[year] = sectionsObj[year].filter((s) => s !== sectionName);
    this.saveSections(sectionsObj);
    this.addNotification('Section Removed', `Section ${sectionName} removed from ${year}.`);
  }

  // --- Applications Control ---
  getApplications() {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : DEFAULT_APPLICATIONS;
  }

  toggleApplicationBlock(id) {
    const apps = this.getApplications();
    const updated = apps.map((app) => (app.id === id ? { ...app, isBlocked: !app.isBlocked } : app));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    this.notify();
    const target = updated.find((a) => a.id === id);
    if (target) {
      this.addNotification('Application Control Changed', `${target.name} is now ${target.isBlocked ? 'Blocked' : 'Allowed'}.`);
    }
  }

  // --- Notifications ---
  getNotifications() {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;
  }

  saveNotifications(notifs) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }

  addNotification(title, message) {
    const notifs = this.getNotifications();
    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      time: 'Just now',
      isRead: false,
    };
    this.saveNotifications([newNotif, ...notifs]);
  }

  markAsRead(id) {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    this.saveNotifications(updated);
  }

  markAllAsRead() {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, isRead: true }));
    this.saveNotifications(updated);
  }

  // --- Settings ---
  getSettings() {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  }

  updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings, department: 'Computer Science and Engineering (CSE)', adminEmail: 'admin@ksrce.ac.in' };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.notify();
  }

  // --- Dashboard Statistics ---
  getStats() {
    const students = this.getStudents();
    const staff = this.getStaff();
    const apps = this.getApplications();

    const activeDevicesCount = students.filter((s) => s.status === 'Active').length;
    const blockedDevicesCount = students.filter((s) => s.status === 'Blocked').length;
    const blockedAppsCount = apps.filter((a) => a.isBlocked).length;

    return {
      totalStudents: students.length,
      totalStaff: staff.length,
      activeDevices: activeDevicesCount,
      blockedDevices: blockedDevicesCount,
      connectedPhones: students.length,
      todaysActivity: `${blockedAppsCount} Apps Controlled`,
    };
  }
}

export const adminService = new AdminService();
export default adminService;
