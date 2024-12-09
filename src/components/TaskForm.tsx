import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { CalendarClock, ListTodo } from 'lucide-react';
import { scheduleNotification } from '../utils/notifications';
import { useThemeStore } from '../store/useThemeStore';

export function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'health' | 'other'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const newTask = {
      title,
      description,
      startTime: start,
      endTime: end,
      completed: false,
      category,
    };

    addTask(newTask);
    scheduleNotification(title, start);
    
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      } p-6 rounded-lg shadow-md`}
    >
      <div className="flex items-center gap-2 mb-6">
        <ListTodo className={`w-6 h-6 ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`} />
        <h2 className="text-xl font-semibold">Nova Tarefa</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-2 rounded-md border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
          }`}
          required
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-4 py-2 rounded-md border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
          }`}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Início
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`w-full px-3 py-2 rounded-md border text-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
              }`}
              required
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
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={`w-full px-3 py-2 rounded-md border text-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className={`w-full px-4 py-2 rounded-md border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
          }`}
        >
          <option value="work">Trabalho</option>
          <option value="personal">Pessoal</option>
          <option value="health">Saúde</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
}