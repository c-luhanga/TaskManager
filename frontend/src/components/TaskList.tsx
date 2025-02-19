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
  <div className="min-vh-100 d-flex flex-column">
  {/* Navbar - Full width, fixed top */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid px-4">
      <span className="navbar-brand">
        <i className="bi bi-check2-square me-2"></i>
        Task Manager
      </span>
      <div className="d-flex align-items-center">
        <span className="text-light me-3">
          <i className="bi bi-person-circle me-2"></i>
          {localStorage.getItem('username')}
        </span>
        <button
          onClick={handleLogout}
          className="btn btn-outline-light"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  </nav>

  {/* Main Content - Full width with padding */}
  <div className="flex-grow-1 bg-light">
    <div className="container-fluid px-4 py-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Add Task Form */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }}>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What needs to be done?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={!newTaskTitle.trim()}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tasks List */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">My Tasks</h5>
              {tasks.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-inbox display-1"></i>
                  <p className="mt-3 fs-5">No tasks yet. Add your first task above!</p>
                </div>
              ) : (
                <div className="list-group">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                    >
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => handleToggleTask(task.id, !task.isComplete)}
                          className={`btn btn-lg me-3 ${
                            task.isComplete ? 'btn-success' : 'btn-outline-secondary'
                          }`}
                        >
                          <i className={`bi ${task.isComplete ? 'bi-check-lg' : 'bi-circle'}`}></i>
                        </button>
                        <span className={`fs-5 ${task.isComplete ? 'text-decoration-line-through text-muted' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn btn-outline-danger btn-lg"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default TaskList;