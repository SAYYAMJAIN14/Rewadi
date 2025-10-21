// Fix: Provide content for the missing mockData file to resolve module import errors.
import { Student, Teacher, Parent, Notification } from '../types';

export const allStudents: Student[] = [
  {
    id: 's101',
    name: 'Rohan Verma',
    class: '10-A',
    attendance: 92,
    overallGrade: 'A',
    isAbsent: false,
    weakSubjects: ['Physics', 'Algebra'],
    attendanceHistory: [
      { date: '2024-07-20', status: 'Present' },
      { date: '2024-07-19', status: 'Present' },
      { date: '2024-07-18', status: 'Absent' },
      { date: '2024-07-17', status: 'Present' },
    ],
    grades: [
      { subject: 'Mathematics', score: 88, grade: 'A' },
      { subject: 'Physics', score: 72, grade: 'B' },
      { subject: 'Chemistry', score: 95, grade: 'A+' },
      { subject: 'English', score: 91, grade: 'A' },
      { subject: 'Algebra', score: 75, grade: 'B' },
    ],
  },
  {
    id: 's102',
    name: 'Priya Sharma',
    class: '10-A',
    attendance: 98,
    overallGrade: 'A+',
    isAbsent: false,
    weakSubjects: [],
    attendanceHistory: [
        { date: '2024-07-20', status: 'Present' },
        { date: '2024-07-19', status: 'Present' },
        { date: '2024-07-18', status: 'Present' },
    ],
    grades: [
        { subject: 'Mathematics', score: 98, grade: 'A+' },
        { subject: 'Physics', score: 96, grade: 'A+' },
        { subject: 'Chemistry', score: 99, grade: 'A+' },
    ],
  },
  {
    id: 's103',
    name: 'Amit Patel',
    class: '9-B',
    attendance: 85,
    overallGrade: 'B',
    isAbsent: true,
    weakSubjects: ['History', 'English Grammar'],
    attendanceHistory: [
        { date: '2024-07-20', status: 'Absent' },
        { date: '2024-07-19', status: 'Present' },
        { date: '2024-07-18', status: 'Absent' },
    ],
    grades: [
        { subject: 'History', score: 68, grade: 'C' },
        { subject: 'English', score: 74, grade: 'B' },
        { subject: 'Science', score: 88, grade: 'A' },
    ],
  },
];

export const allTeachers: Teacher[] = [
    { id: 't201', name: 'Mr. Gupta', subject: 'Mathematics' },
    { id: 't202', name: 'Mrs. Singh', subject: 'Science' },
    { id: 't203', name: 'Ms. Khan', subject: 'English' },
];

export const allParents: Parent[] = [
    { id: 'p301', name: 'Mr. Verma', childId: 's101' },
    { id: 'p302', name: 'Mrs. Sharma', childId: 's102' },
    { id: 'p303', name: 'Mr. Patel', childId: 's103' },
];

export const allNotifications: Notification[] = [
    { id: 'n401', title: 'Parent-Teacher Meeting Scheduled', content: 'A parent-teacher meeting is scheduled for next Saturday.', timestamp: '2024-07-15T10:00:00Z', read: false },
    { id: 'n402', title: 'Annual Sports Day', content: 'The annual sports day will be held on August 5th.', timestamp: '2024-07-18T14:30:00Z', read: true },
];
