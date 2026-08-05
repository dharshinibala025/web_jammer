const STAFF_PROFILES = {
  'rajesh.kumar@ksrce.ac.in': {
    name: 'Dr. Rajesh Kumar',
    designation: 'Professor & Head',
    id: 'KSR-STF-1024',
    department: 'Computer Science Engineering',
    email: 'rajesh.kumar@ksrce.ac.in',
    mobile: '+91 94421 78905',
    roleAssignment: 'Professor & Head (CSE Monitoring)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
    initials: 'RK',
    assignedClass: 'III CSE - A',
    password: 'staff@123',
  },
  'priya.nair@ksrce.ac.in': {
    name: 'Prof. Priya Nair',
    designation: 'Assistant Professor',
    id: 'KSR-STF-214',
    department: 'Computer Science Engineering',
    email: 'priya.nair@ksrce.ac.in',
    mobile: '+91 98765 43210',
    roleAssignment: 'Class Advisor - II CSE A',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    initials: 'PN',
    assignedClass: 'II CSE - A',
    password: 'staff@123',
  },
};

export const getStaffProfile = (email) => {
  return STAFF_PROFILES[email] || STAFF_PROFILES['rajesh.kumar@ksrce.ac.in'];
};

export const STAFF_EMAILS = Object.keys(STAFF_PROFILES);

const defaultStaff = STAFF_PROFILES['rajesh.kumar@ksrce.ac.in'];

const classMapping = {
  'III CSE - A': '3rd Year - A',
  'III CSE - B': '3rd Year - B',
  'II CSE - A': '2nd Year - A',
  'IV CSE - A': 'Final Year - A',
};

export const getSectionKeyFromClass = (assignedClass) => {
  return classMapping[assignedClass] || assignedClass;
};

const SECTIONS = {
  '3rd Year - A': [
    { id: '3a1', name: 'Ajith Kumar R', rollNo: '21CS003', status: 'active', device: 'OnePlus 11R', screenTime: '2h 30m', attempts: 0 },
    { id: '3a2', name: 'Divya S', rollNo: '21CS014', status: 'blocked', device: 'iPhone 14', screenTime: '3h 15m', attempts: 8 },
    { id: '3a3', name: 'Hariharan B', rollNo: '21CS028', status: 'active', device: 'Samsung S22', screenTime: '1h 40m', attempts: 0 },
    { id: '3a4', name: 'Kavin M', rollNo: '21CS042', status: 'active', device: 'Pixel 7a', screenTime: '1h 10m', attempts: 0 },
    { id: '3a5', name: 'Nithya R', rollNo: '21CS063', status: 'blocked', device: 'Redmi Note 12 Pro', screenTime: '2h 20m', attempts: 3 },
  ],
  '2nd Year - A': [
    { id: '2a1', name: 'Adithya K', rollNo: '22CS001', status: 'active', device: 'Samsung S23', screenTime: '1h 45m', attempts: 0 },
    { id: '2a2', name: 'Bala J', rollNo: '22CS008', status: 'blocked', device: 'OnePlus 11', screenTime: '2h 10m', attempts: 4 },
  ],
};

const ALL_NOTIFICATIONS = {
  default: [
    { id: 'n1', studentName: 'Divya S', rollNo: '21CS014', action: 'Instagram access attempt blocked', time: '05:28 AM', read: false },
    { id: 'n2', studentName: 'Nithya R', rollNo: '21CS063', action: 'Free Fire game launch blocked', time: '05:25 AM', read: false },
  ],
};

export const getStudentsForClass = (assignedClass) => {
  const sectionKey = getSectionKeyFromClass(assignedClass);
  const students = SECTIONS[sectionKey] || SECTIONS['3rd Year - A'];
  return students.map(s => ({
    ...s,
    online: s.status !== 'offline',
    lastSync: s.status === 'offline' ? '15 min ago' : s.status === 'blocked' ? '2 min ago' : 'Just now',
  }));
};

export const getNotificationsForClass = (assignedClass) => {
  return ALL_NOTIFICATIONS.default;
};

export const staffMockData = {
  staff: defaultStaff,
  sections: SECTIONS,
  notifications: ALL_NOTIFICATIONS.default,
};

export default staffMockData;
