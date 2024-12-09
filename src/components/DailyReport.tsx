import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { BarChart3, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { isToday, startOfDay } from 'date-fns';

export function DailyReport() {
  const tasks = useTaskStore((state) => state.tasks);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [report, setReport] = useState({
    completed: 0,
    total: 0,
    late: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Filtra tarefas de hoje
    const todaysTasks = tasks.filter((task) => {
      const taskDate = task.startTime instanceof Date ? task.startTime : new Date(task.startTime);
      return isToday(taskDate);
    });

    // Conta tarefas concluídas
    const completed = todaysTasks.filter((task) => task.completed).length;
    const total = todaysTasks.length;

    // Verifica tarefas atrasadas
    const now = new Date();
    const late = todaysTasks.filter((task) => {
      const endTime = task.endTime instanceof Date ? task.endTime : new Date(task.endTime);
      return !task.completed && endTime < now;
    }).length;

    // Calcula a taxa de conclusão
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setReport({
      completed,
      total,
      late,
      completionRate
    });
  }, [tasks]); // Recalcula quando as tarefas mudarem

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
    } p-6 rounded-lg shadow-md`}>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className={`w-6 h-6 ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`} />
        <h2 className="text-xl font-semibold">Relatório Diário</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-green-50'
        }`}>
          <CheckCircle className={`w-8 h-8 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`} />
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>Tarefas Concluídas</p>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-green-300' : 'text-green-700'
            }`}>
              {report.completed}/{report.total}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-red-50'
        }`}>
          <XCircle className={`w-8 h-8 ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`} />
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>Tarefas Atrasadas</p>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-red-300' : 'text-red-700'
            }`}>{report.late}</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
        }`}>
          <Clock className={`w-8 h-8 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Taxa de Conclusão</p>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              {report.completionRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}