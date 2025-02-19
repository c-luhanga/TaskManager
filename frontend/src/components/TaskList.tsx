import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const loadTasks = async () => {
    try {
      if (!token) {
        setError('Not authenticated');
        return;
      }
      const response = await fetchTasks(token);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (!token) return;
      if (!newTaskTitle.trim()) return;

      await createTask(token, newTaskTitle);
      setNewTaskTitle('');
      loadTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleToggleTask = async (taskId: number, isComplete: boolean) => {
    try {
      if (!token) return;
      await updateTask(token, taskId, isComplete);
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      if (!token) return;
      await deleteTask(token, taskId);
      // Only update the UI after successful deletion
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

 return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <span className="text-gray-600">Welcome, {localStorage.getItem('username')}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateTask()}
            />
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className={`${task.isComplete ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleToggleTask(task.id, !task.isComplete)}
                    className={`px-3 py-1 rounded transition-colors ${
                      task.isComplete 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gray-500 hover:bg-gray-600'
                    } text-white`}
                  >
                    {task.isComplete ? '✓' : '○'}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="text-center py-8 text-gray-500">
                No tasks yet. Add your first task above!
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TaskList;