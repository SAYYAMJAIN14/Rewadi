export enum UserRole {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student',
  Parent = 'Parent',
}

export interface Student {
  id: string;
  name: string;
  class: string;
  attendance: number;
  overallGrade: string;
  isAbsent: boolean;
  weakSubjects: string[];
  attendanceHistory: { date: string; status: 'Present' | 'Absent' }[];
  grades: { subject: string; score: number; grade: string }[];
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
}

export interface Parent {
    id: string;
    name: string;
    childId: string;
}


export interface Notification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
}