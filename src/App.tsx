import React, { useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { DailyReport } from './components/DailyReport';
import { ThemeToggle } from './components/ThemeToggle';
import { ConnectivityStatus } from './components/ConnectivityStatus';
import { InstallPWA } from './components/InstallPWA';
import { requestNotificationPermission } from './utils/notifications';
import { Toaster } from 'react-hot-toast';
import { Calendar, Instagram } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    requestNotificationPermission();
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/custom-sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <Toaster position="top-right" />
      <ConnectivityStatus />
      <InstallPWA />
      
      <header className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      } shadow-sm sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Minha Agenda
                </h1>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Desenvolvido por DGSolutionWEB
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-1 order-1 lg:order-none">
            <div className="sticky top-24">
              <TaskForm />
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4 sm:space-y-8 order-2 lg:order-none">
            <DailyReport />
            <TaskList />
          </div>
        </div>
      </main>

      <footer className={`${
        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
      } py-4 mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>© {new Date().getFullYear()}</span>
            <a 
              href="https://www.instagram.com/dgsolutionweb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <Instagram size={16} />
              <span className="font-medium">DGSolutionWEB</span>
            </a>
          </div>
          <div className="text-sm">Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;