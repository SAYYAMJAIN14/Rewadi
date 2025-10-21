
import React from 'react';
import Card from './Card';
import { ParentIcon, StudentIcon } from '../icons';

const ParentDashboard = () => {
    // Mock parent and child data
    const child = {
        name: 'Rohan Verma',
        class: '10-A',
        attendance: '92%',
        lastAbsent: '2 days ago',
    };
    const notifications = [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'July 20th' },
        { id: 2, title: 'Homework: Physics Chapter 4', date: 'Today' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Parent Dashboard</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Viewing details for <strong>{child.name}</strong> (Class {child.class})</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Child's Attendance" icon={<StudentIcon className="w-6 h-6"/>} color="green">
                    <p className="text-3xl font-bold">{child.attendance}</p>
                    <p className="text-sm text-gray-400">Last absent: {child.lastAbsent}</p>
                </Card>
                <Card title="Recent Results" icon={<StudentIcon className="w-6 h-6"/>} color="blue">
                    <p className="text-lg">Mid-Term Exam: <span className="font-bold">Grade A</span></p>
                    <button className="mt-3 text-blue-500 hover:underline text-sm">View Detailed Report</button>
                </Card>
                <Card title="Pay Fees Online" icon={<ParentIcon className="w-6 h-6"/>} color="orange">
                    <p className="text-lg text-red-500 font-semibold">July fees overdue.</p>
                     <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full">Pay Now</button>
                </Card>
            </div>
             <div className="mt-8">
                <Card title="Notifications & Announcements" icon={<ParentIcon className="w-6 h-6"/>} color="purple">
                     <ul className="space-y-3">
                        {notifications.map(n => (
                            <li key={n.id} className="p-3 bg-purple-50 dark:bg-purple-900/50 rounded-md">
                                <p className="font-semibold">{n.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{n.date}</p>
                            </li>
                        ))}
                     </ul>
                </Card>
            </div>
        </div>
    );
};

export default ParentDashboard;
