// Fix: Provide content for the missing AdminDashboard component to resolve module import errors.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { StudentIcon, TeacherIcon, ParentIcon, UsersIcon, BellIcon, ChartBarIcon } from '../icons';
import { allStudents, allTeachers, allParents, allNotifications } from '../../data/mockData';
import Modal from '../Modal';
import { AddStudentForm, AddTeacherForm, AddParentForm } from '../forms/AddUserForms';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalTitle, setModalTitle] = useState('');

    const openModal = (type: 'student' | 'teacher' | 'parent') => {
        setIsModalOpen(true);
        switch(type) {
            case 'student':
                setModalTitle('Add New Student');
                setModalContent(<AddStudentForm onClose={() => setIsModalOpen(false)} />);
                break;
            case 'teacher':
                setModalTitle('Add New Teacher');
                setModalContent(<AddTeacherForm onClose={() => setIsModalOpen(false)} />);
                break;
            case 'parent':
                setModalTitle('Add New Parent');
                setModalContent(<AddParentForm onClose={() => setIsModalOpen(false)} />);
                break;
        }
    };

    const absentStudents = allStudents.filter(s => s.isAbsent);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Total Students" icon={<StudentIcon className="w-6 h-6"/>} color="blue">
                    <p className="text-3xl font-bold">{allStudents.length}</p>
                </Card>
                <Card title="Total Teachers" icon={<TeacherIcon className="w-6 h-6"/>} color="green">
                    <p className="text-3xl font-bold">{allTeachers.length}</p>
                </Card>
                <Card title="Total Parents" icon={<ParentIcon className="w-6 h-6"/>} color="purple">
                     <p className="text-3xl font-bold">{allParents.length}</p>
                </Card>
                <Card title="Overall Attendance" icon={<ChartBarIcon className="w-6 h-6"/>} color="orange">
                    <p className="text-3xl font-bold">
                        {Math.round(allStudents.reduce((acc, s) => acc + s.attendance, 0) / allStudents.length)}%
                    </p>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Management */}
                <div className="lg:col-span-2">
                    <Card title="Student Management" icon={<UsersIcon className="w-6 h-6"/>} color="blue">
                        <div className="flex justify-end mb-4">
                             <button onClick={() => openModal('student')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                                Add Student
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Class</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Grade</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {allStudents.slice(0, 5).map(student => (
                                        <tr key={student.id}>
                                            <td className="px-4 py-2 whitespace-nowrap">{student.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">{student.class}</td>
                                            <td className="px-4 py-2 whitespace-nowrap font-semibold">{student.overallGrade}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <button onClick={() => navigate(`/dashboard/admin/student/${student.id}`)} className="text-blue-500 hover:underline text-sm">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions & Notifications */}
                <div className="space-y-6">
                    <Card title="Quick Actions" icon={<UsersIcon className="w-6 h-6"/>} color="green">
                        <div className="space-y-2">
                            <button onClick={() => openModal('teacher')} className="w-full text-left bg-green-50 dark:bg-green-900/50 p-3 rounded-md hover:bg-green-100 dark:hover:bg-green-900">Add New Teacher</button>
                            <button onClick={() => openModal('parent')} className="w-full text-left bg-green-50 dark:bg-green-900/50 p-3 rounded-md hover:bg-green-100 dark:hover:bg-green-900">Add New Parent</button>
                            <button className="w-full text-left bg-green-50 dark:bg-green-900/50 p-3 rounded-md hover:bg-green-100 dark:hover:bg-green-900">Manage Classes</button>
                        </div>
                    </Card>

                    <Card title={`Students Absent Today (${absentStudents.length})`} icon={<StudentIcon className="w-6 h-6"/>} color="red">
                        {absentStudents.length > 0 ? (
                            <ul className="space-y-2">
                                {absentStudents.map(s => <li key={s.id} className="text-sm">{s.name} - {s.class}</li>)}
                            </ul>
                        ) : <p className="text-sm">No students are marked absent today.</p>}
                    </Card>

                    <Card title="Notifications" icon={<BellIcon className="w-6 h-6"/>} color="purple">
                        <ul className="space-y-3">
                            {allNotifications.map(n => (
                                <li key={n.id} className="p-2 bg-purple-50 dark:bg-purple-900/50 rounded-md text-sm">
                                    <p className="font-semibold">{n.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(n.timestamp).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-3 text-purple-500 hover:underline text-sm w-full text-right">Send New Notification</button>
                    </Card>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default AdminDashboard;
