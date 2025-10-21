
import React from 'react';
import Card from './Card';
import { TeacherIcon, StudentIcon } from '../icons';

const TeacherDashboard = () => {
    // Mock data
    const classes = ['Class 10-A (Math)', 'Class 9-B (Science)'];
    const pendingAssignments = 3;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Teacher Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="My Classes" icon={<TeacherIcon className="w-6 h-6"/>} color="blue">
                    <ul className="space-y-2">
                        {classes.map(c => <li key={c} className="bg-blue-50 dark:bg-blue-900/50 p-2 rounded-md">{c}</li>)}
                    </ul>
                </Card>
                <Card title="Mark Attendance" icon={<StudentIcon className="w-6 h-6"/>} color="green">
                    <p>Mark today's attendance for your classes.</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">Open Attendance Sheet</button>
                </Card>
                <Card title="Homework & Assignments" icon={<TeacherIcon className="w-6 h-6"/>} color="orange">
                    <p className="text-lg font-bold">{pendingAssignments} <span className="text-base font-normal">submissions to grade.</span></p>
                    <button className="mt-4 border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors w-full">Grade Now</button>
                </Card>
            </div>
        </div>
    );
};

export default TeacherDashboard;
