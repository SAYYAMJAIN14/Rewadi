
import React, { useState, useCallback } from 'react';
import Card from './Card';
import { StudentIcon } from '../icons';
import { getStudyRecommendations } from '../../services/geminiService';

const StudentDashboard = () => {
    // Mock student data
    const student = {
        name: 'Rohan Verma',
        class: '10-A',
        weakSubjects: ['Physics', 'Algebra']
    };

    const [recommendations, setRecommendations] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);

    const handleGenerateClick = useCallback(async () => {
        setIsLoading(true);
        setIsGenerated(false);
        const result = await getStudyRecommendations(student.name, student.weakSubjects);
        setRecommendations(result);
        setIsLoading(false);
        setIsGenerated(true);
    }, [student.name, student.weakSubjects]);
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome, {student.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card title="My Attendance" icon={<StudentIcon className="w-6 h-6"/>} color="green">
                     <p className="text-3xl font-bold">92%</p>
                     <p className="text-sm text-gray-400">Overall this semester</p>
                 </Card>
                 <Card title="Upcoming Exams" icon={<StudentIcon className="w-6 h-6"/>} color="orange">
                     <ul className="list-disc list-inside">
                        <li>Mathematics - 25th July</li>
                        <li>Physics - 28th July</li>
                     </ul>
                 </Card>
            </div>
            <div className="mt-8">
                <Card title="Personalized AI Learning Assistant" icon={<StudentIcon className="w-6 h-6"/>} color="purple">
                    <p className="mb-4">Get personalized study tips and quizzes for your weak subjects: <strong>{student.weakSubjects.join(', ')}</strong>.</p>
                    <button 
                        onClick={handleGenerateClick}
                        disabled={isLoading}
                        className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Create My Daily Quiz'}
                    </button>

                    {isLoading && <div className="mt-4 text-center">Thinking... Please wait.</div>}
                    
                    {isGenerated && (
                        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {recommendations}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
