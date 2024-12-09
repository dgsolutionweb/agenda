import { useTaskStore } from '../store/useTaskStore';

interface SyncQueue {
  action: 'add' | 'update' | 'delete';
  data: any;
  timestamp: number;
}

class SyncService {
  private queue: SyncQueue[] = [];
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.loadQueueFromStorage();
    this.setupEventListeners();
  }

  private loadQueueFromStorage() {
    const savedQueue = localStorage.getItem('sync-queue');
    if (savedQueue) {
      this.queue = JSON.parse(savedQueue);
    }
  }

  private saveQueueToStorage() {
    localStorage.setItem('sync-queue', JSON.stringify(this.queue));
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  addToQueue(action: SyncQueue['action'], data: any) {
    this.queue.push({
      action,
      data,
      timestamp: Date.now(),
    });
    this.saveQueueToStorage();
    if (this.isOnline) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (!this.isOnline || this.queue.length === 0) return;

    const currentQueue = [...this.queue];
    this.queue = [];
    this.saveQueueToStorage();

    try {
      // Aqui você implementaria a lógica real de sincronização com o backend
      // Por exemplo:
      for (const item of currentQueue) {
        switch (item.action) {
          case 'add':
            // await api.post('/tasks', item.data);
            break;
          case 'update':
            // await api.put(`/tasks/${item.data.id}`, item.data);
            break;
          case 'delete':
            // await api.delete(`/tasks/${item.data.id}`);
            break;
        }
      }
    } catch (error) {
      // Em caso de erro, coloca os itens de volta na fila
      this.queue = [...currentQueue, ...this.queue];
      this.saveQueueToStorage();
      console.error('Erro ao sincronizar:', error);
    }
  }
}

export const syncService = new SyncService(); 