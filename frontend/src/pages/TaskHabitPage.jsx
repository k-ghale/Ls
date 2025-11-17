import React from 'react'
import { Link } from 'react-router-dom'

// const TaskHabitPage = () => {
//   return (
//     <section className="ls-page">
//       <div className="ls-container">
//         <h1>Task &amp; Habit Management – Iteration 1</h1>
//         <p>
//           Skeleton page for task &amp; habit user stories (GS10, GS12, GS14,
//           MS5, MemS4, MemS5, VS1).
//         </p>

//         <ul>
//           <li><Link to="/task/create">GS12 – Create Task/Habit</Link></li>
//           <li><Link to="/task/assign">GS10 – Assign Task/Habit</Link></li>
//           <li><Link to="/task/edit">GS14 – Edit Task/Habit</Link></li>
//           <li><Link to="/task/approve">MS5 – Moderator Approval</Link></li>
//           <li><Link to="/task/member-add">MemS4 – Member Adds Task/Habit</Link></li>
//           <li><Link to="/task/member-view">MemS5 – Member Views Tasks</Link></li>
//           <li><Link to="/task/viewer">VS1 – Viewer Task Status</Link></li>
//         </ul>
//       </div>
//     </section>
//   )
// }

// export default TaskHabitPage
import { 
  CheckSquare, 
  Target, 
  X, 
  Calendar,
  Users,
  FileText,
  AlertCircle,
  Clock,
  Repeat
} from "lucide-react";
import { useState } from "react";

// Form Modal Component
const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, icon: Icon, required, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Textarea Field Component
const TextareaField = ({ label, icon: Icon, required, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <textarea
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
        rows="4"
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Select Field Component
const SelectField = ({ label, icon: Icon, required, error, options, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <select
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Task Form Component
const TaskForm = ({ groupMembers, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    priority: 'Medium',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Please assign a member';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Task submitted:', formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' }
  ];

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
  ];

  return (
    <div>
      <InputField
        label="Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Complete project report"
        icon={CheckSquare}
        required
        error={errors.title}
      />

      <TextareaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Provide details about the task..."
        icon={FileText}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          icon={Calendar}
          required
          error={errors.dueDate}
        />

        <SelectField
          label="Assign To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          icon={Users}
          required
          error={errors.assignedTo}
          options={[
            { value: '', label: 'Select a member' },
            ...groupMembers.map(m => ({ value: m.id, label: m.name }))
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          icon={AlertCircle}
          options={priorityOptions}
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          icon={Clock}
          options={statusOptions}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              <CheckSquare className="w-5 h-5 mr-2" />
              Create Task
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Habit Form Component
const HabitForm = ({ groupMembers, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'Daily',
    startDate: '',
    assignedMembers: [],
    reminderTime: '',
    goal: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMemberToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      assignedMembers: prev.assignedMembers.includes(memberId)
        ? prev.assignedMembers.filter(id => id !== memberId)
        : [...prev.assignedMembers, memberId]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (formData.assignedMembers.length === 0) newErrors.assignedMembers = 'Assign at least one member';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Habit submitted:', formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting habit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Custom', label: 'Custom' }
  ];

  return (
    <div>
      <InputField
        label="Habit Name"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Morning Exercise"
        icon={Target}
        required
        error={errors.title}
      />

      <TextareaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the habit and its benefits..."
        icon={FileText}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          icon={Repeat}
          options={frequencyOptions}
        />

        <InputField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          icon={Calendar}
          required
          error={errors.startDate}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Reminder Time (Optional)"
          name="reminderTime"
          type="time"
          value={formData.reminderTime}
          onChange={handleChange}
          icon={Clock}
        />

        <InputField
          label="Goal (Optional)"
          name="goal"
          type="number"
          value={formData.goal}
          onChange={handleChange}
          placeholder="e.g., 30 days"
          icon={Target}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Assign Members <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-300 rounded-lg p-4 space-y-2 max-h-40 overflow-y-auto">
          {groupMembers.map(member => (
            <label
              key={member.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={formData.assignedMembers.includes(member.id)}
                onChange={() => handleMemberToggle(member.id)}
                className="w-4 h-4 text-blue-600 rounded mr-3"
              />
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                {member.name.charAt(0)}
              </div>
              <span className="text-gray-700">{member.name}</span>
            </label>
          ))}
        </div>
        {errors.assignedMembers && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.assignedMembers}
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              <Target className="w-5 h-5 mr-2" />
              Create Habit
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function TaskHabitForms() {
  const [activeModal, setActiveModal] = useState(null);

  // Mock group members
  const groupMembers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Emma Wilson' }
  ];

  const handleTaskSubmit = (data) => {
    console.log('Task created:', data);
    alert('Task created successfully!');
    setActiveModal(null);
  };

  const handleHabitSubmit = (data) => {
    console.log('Habit created:', data);
    alert('Habit created successfully!');
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Create Tasks & Habits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Task</h2>
            <p className="text-gray-600 mb-6">
              Create and assign tasks with due dates, priorities, and track progress.
            </p>
            <button
              onClick={() => setActiveModal('task')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              New Task
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Habit</h2>
            <p className="text-gray-600 mb-6">
              Build consistent habits with your group through daily or weekly tracking.
            </p>
            <button
              onClick={() => setActiveModal('habit')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              <Target className="w-5 h-5 mr-2" />
              New Habit
            </button>
          </div>
        </div>
      </div>

      <FormModal
        isOpen={activeModal === 'task'}
        onClose={() => setActiveModal(null)}
        title="Create New Task"
      >
        <TaskForm
          groupMembers={groupMembers}
          onSubmit={handleTaskSubmit}
          onCancel={() => setActiveModal(null)}
        />
      </FormModal>

      <FormModal
        isOpen={activeModal === 'habit'}
        onClose={() => setActiveModal(null)}
        title="Create New Habit"
      >
        <HabitForm
          groupMembers={groupMembers}
          onSubmit={handleHabitSubmit}
          onCancel={() => setActiveModal(null)}
        />
      </FormModal>
    </div>
  );
}
