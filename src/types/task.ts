export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  category: 'work' | 'personal' | 'health' | 'other';
}