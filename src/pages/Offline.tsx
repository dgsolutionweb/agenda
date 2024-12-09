import { WifiOff } from 'lucide-react';

export function Offline() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <WifiOff className="w-16 h-16 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Você está offline
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Não foi possível conectar ao servidor. Verifique sua conexão com a internet.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Não se preocupe, você ainda pode acessar suas tarefas salvas anteriormente.
        </p>
      </div>
    </div>
  );
} 