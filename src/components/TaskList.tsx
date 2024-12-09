import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle2, Circle, Trash2, Edit2, X } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { scheduleNotification } from '../utils/notifications';

export function TaskList() {
  const { tasks, toggleTask, deleteTask, updateTask } = useTaskStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: '',
  });

  const sortedTasks = [...tasks].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const getCategoryColor = (category: string) => {
    const colors = {
      work: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      personal: isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      health: isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      other: isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors];
  };

  const startEditing = (task: any) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description || '',
      startTime: format(new Date(task.startTime), "yyyy-MM-dd'T'HH:mm"),
      endTime: format(new Date(task.endTime), "yyyy-MM-dd'T'HH:mm"),
      category: task.category,
    });
  };

  const handleUpdate = (id: string) => {
    const updatedTask = {
      title: editForm.title,
      description: editForm.description,
      startTime: new Date(editForm.startTime),
      endTime: new Date(editForm.endTime),
      category: editForm.category as any,
    };

    updateTask(id, updatedTask);
    scheduleNotification(editForm.title, new Date(editForm.startTime));
    setEditingTask(null);
  };

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
          } p-4 rounded-lg shadow-md transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          {editingTask === task.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Início
                  </label>
                  <input
                    type="datetime-local"
                    value={editForm.startTime}
                    onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Fim
                  </label>
                  <input
                    type="datetime-local"
                    value={editForm.endTime}
                    onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="work">Trabalho</option>
                <option value="personal">Pessoal</option>
                <option value="health">Saúde</option>
                <option value="other">Outro</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleUpdate(task.id)}
                  className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  } hover:text-indigo-800`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div>
                  <h3
                    className={`font-medium ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        task.category
                      )}`}
                    >
                      {task.category}
                    </span>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {format(task.startTime, "HH:mm 'de' dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(task)}
                  className={`${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  } hover:text-blue-800`}
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {tasks.length === 0 && (
        <div className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Nenhuma tarefa cadastrada
        </div>
      )}
    </div>
  );
}