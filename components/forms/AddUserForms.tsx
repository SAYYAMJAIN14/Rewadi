// Fix: Provide content for the missing AddUserForms components to resolve module import errors.
import React from 'react';

interface FormProps {
  onClose: () => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            {...props}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export const AddStudentForm: React.FC<FormProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would dispatch an action or call an API.
        alert('Student added successfully! (mock)');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Full Name" id="name" type="text" required />
            <InputField label="Class (e.g., 10-A)" id="class" type="text" required />
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Add Student</button>
            </div>
        </form>
    );
};

export const AddTeacherForm: React.FC<FormProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would dispatch an action or call an API.
        alert('Teacher added successfully! (mock)');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Full Name" id="name" type="text" required />
            <InputField label="Subject" id="subject" type="text" required />
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Add Teacher</button>
            </div>
        </form>
    );
};

export const AddParentForm: React.FC<FormProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would dispatch an action or call an API.
        alert('Parent added successfully! (mock)');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Full Name" id="name" type="text" required />
            <InputField label="Child's Student ID" id="childId" type="text" required />
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Add Parent</button>
            </div>
        </form>
    );
};
