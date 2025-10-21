import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allStudents } from '../data/mockData';
import Card from '../components/dashboard/Card';
import { StudentIcon, EditIcon, ArrowLeftIcon } from '../components/icons';
import { Student } from '../types';

const StudentDetailsPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const getStudent = () => allStudents.find(s => s.id === studentId);
  
  const [student, setStudent] = useState<Student | undefined>(getStudent());
  const [isEditing, setIsEditing] = useState(false);
  const [editableStudent, setEditableStudent] = useState<Student | undefined>(student);

  useEffect(() => {
    const currentStudent = getStudent();
    setStudent(currentStudent);
    setEditableStudent(currentStudent);
  }, [studentId]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditableStudent(student); // Reset any changes
  };

  const handleSave = () => {
    const studentIndex = allStudents.findIndex(s => s.id === studentId);
    if (studentIndex !== -1 && editableStudent) {
      // In a real app, this would be an API call.
      const updatedStudentData = {
        ...editableStudent,
        // FIX: The input field can turn `weakSubjects` into a string, causing a type conflict.
        // `String()` safely handles the type coercion to prevent a TypeScript error.
        weakSubjects: Array.isArray(editableStudent.weakSubjects)
          ? editableStudent.weakSubjects
          : String(editableStudent.weakSubjects).split(',').map(s => s.trim()).filter(Boolean)
      };
      allStudents[studentIndex] = updatedStudentData;
      setStudent(updatedStudentData); // Update the main student state
      setEditableStudent(updatedStudentData); // Sync editable state
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableStudent) {
      setEditableStudent({
        ...editableStudent,
        [name]: value,
      });
    }
  };

  if (!student || !editableStudent) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p>The student with ID {studentId} could not be found.</p>
        <button onClick={() => navigate('/dashboard/admin')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard/admin')} className="flex items-center space-x-2 text-blue-500 hover:underline">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold">
              Save
            </button>
            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleEdit} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <EditIcon className="w-5 h-5" />
            <span>Edit Information</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="Student Profile" icon={<StudentIcon className="w-6 h-6"/>} color="blue">
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editableStudent.name}
                      onChange={handleInputChange}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
                    <input
                      type="text"
                      name="class"
                      id="class"
                      value={editableStudent.class}
                      onChange={handleInputChange}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="weakSubjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weak Subjects (comma-separated)</label>
                    <input
                      type="text"
                      name="weakSubjects"
                      id="weakSubjects"
                      value={Array.isArray(editableStudent.weakSubjects) ? editableStudent.weakSubjects.join(', ') : editableStudent.weakSubjects}
                      onChange={handleInputChange}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p><strong>ID:</strong> {student.id}</p>
                  <p><strong>Overall Grade:</strong> <span className="font-bold text-blue-500">{student.overallGrade}</span></p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{student.name}</h3>
                  <p><strong>ID:</strong> {student.id}</p>
                  <p><strong>Class:</strong> {student.class}</p>
                  <p><strong>Overall Grade:</strong> <span className="font-bold text-blue-500">{student.overallGrade}</span></p>
                  {student.weakSubjects.length > 0 && (
                    <p><strong>Weak Subjects:</strong> <span className="text-red-500">{student.weakSubjects.join(', ')}</span></p>
                  )}
                </>
              )}
            </div>
          </Card>
           <Card title="Attendance History" icon={<StudentIcon className="w-6 h-6"/>} color="green">
             <div className="space-y-2">
                {student.attendanceHistory.map(record => (
                    <div key={record.date} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                        <span>{record.date}</span>
                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'Absent'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                                : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                            }`}
                        >
                            {record.status}
                        </span>
                    </div>
                ))}
             </div>
           </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
           <Card title="Academic Performance" icon={<StudentIcon className="w-6 h-6"/>} color="purple">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {student.grades.map(grade => (
                            <tr key={grade.subject}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{grade.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{grade.score}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 dark:text-gray-200">{grade.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;