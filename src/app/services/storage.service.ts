import { Injectable, signal } from '@angular/core';
import { SEED_DATA } from './seed-data';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskType = 'practice' | 'questions' | 'video' | 'book';
export type LogType = 'normal' | 'progress';

export interface DailyLog {
  id: string;
  title: string;
  content: string;
  date: string;
  type: LogType;
  goalId?: string;
  subGoalId?: string;
  taskId?: string;
  status?: TaskStatus;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface SubGoal {
  id: string;
  goalId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface TaskLink {
  title: string;
  url: string;
}

export interface TaskFile {
  name: string;
  size?: number;
  type?: string;
  data?: string; // base64
}

export interface Task {
  id: string;
  subGoalId: string;
  title: string;
  description: string;
  duration: string;
  targetEndDate: string;
  subtask: string;
  frequency: string;
  type: TaskType;
  status: TaskStatus;
  links?: TaskLink[];
  files?: TaskFile[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface ProgressEntry {
  id: string;
  metric: string;
  value: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEYS = {
    DAILY_LOGS: 'primeos_daily_logs',
    GOALS: 'primeos_goals',
    SUB_GOALS: 'primeos_sub_goals',
    TASKS: 'primeos_tasks',
    NOTES: 'primeos_notes',
    PROGRESS: 'primeos_progress',
    CATEGORIES: 'primeos_categories'
  };

  dailyLogs = signal<DailyLog[]>(this.load(this.STORAGE_KEYS.DAILY_LOGS));
  goals = signal<Goal[]>(this.load(this.STORAGE_KEYS.GOALS));
  subGoals = signal<SubGoal[]>(this.load(this.STORAGE_KEYS.SUB_GOALS));
  tasks = signal<Task[]>(this.load(this.STORAGE_KEYS.TASKS));
  notes = signal<Note[]>(this.load(this.STORAGE_KEYS.NOTES));
  progress = signal<ProgressEntry[]>(this.load(this.STORAGE_KEYS.PROGRESS));
  categories = signal<Category[]>(this.load(this.STORAGE_KEYS.CATEGORIES));

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    if (this.goals().length === 0) {
      this.resetToSeed();
    }

    if (this.categories().length === 0) {
      this.categories.set([
        { id: '1', name: 'Health' },
        { id: '2', name: 'Career' },
        { id: '3', name: 'Learning' },
        { id: '4', name: 'Personal' }
      ]);
      this.save(this.STORAGE_KEYS.CATEGORIES, this.categories());
    }
  }

  private load<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- DATA MANAGEMENT ---

  exportAllData() {
    return {
      goals: this.goals(),
      subGoals: this.subGoals(),
      tasks: this.tasks(),
      dailyLogs: this.dailyLogs(),
      notes: this.notes(),
      categories: this.categories(),
      progress: this.progress()
    };
  }

  importAllData(data: any) {
    if (data.goals) {
      this.goals.set(data.goals);
      this.save(this.STORAGE_KEYS.GOALS, data.goals);
    }
    if (data.subGoals) {
      this.subGoals.set(data.subGoals);
      this.save(this.STORAGE_KEYS.SUB_GOALS, data.subGoals);
    }
    if (data.tasks) {
      this.tasks.set(data.tasks);
      this.save(this.STORAGE_KEYS.TASKS, data.tasks);
    }
    if (data.dailyLogs) {
      this.dailyLogs.set(data.dailyLogs);
      this.save(this.STORAGE_KEYS.DAILY_LOGS, data.dailyLogs);
    }
    if (data.notes) {
      this.notes.set(data.notes);
      this.save(this.STORAGE_KEYS.NOTES, data.notes);
    }
    if (data.categories) {
      this.categories.set(data.categories);
      this.save(this.STORAGE_KEYS.CATEGORIES, data.categories);
    }
    if (data.progress) {
      this.progress.set(data.progress);
      this.save(this.STORAGE_KEYS.PROGRESS, data.progress);
    }
  }

  clearAllData() {
    Object.values(this.STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.goals.set([]);
    this.subGoals.set([]);
    this.tasks.set([]);
    this.dailyLogs.set([]);
    this.notes.set([]);
    this.categories.set([]);
    this.progress.set([]);
  }

  resetToSeed() {
    this.clearAllData();
    this.goals.set(SEED_DATA.goals);
    this.save(this.STORAGE_KEYS.GOALS, SEED_DATA.goals);
    this.subGoals.set(SEED_DATA.subGoals);
    this.save(this.STORAGE_KEYS.SUB_GOALS, SEED_DATA.subGoals);
    this.tasks.set(SEED_DATA.tasks.map(t => ({...t, type: t.type || 'practice', status: 'pending'} as Task)));
    this.save(this.STORAGE_KEYS.TASKS, this.tasks());
  }

  // --- GOALS ---

  addGoal(goal: Omit<Goal, 'id' | 'createdAt'>) {
    const newGoal = { ...goal, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const goals = [...this.goals(), newGoal];
    this.goals.set(goals);
    this.save(this.STORAGE_KEYS.GOALS, goals);
  }

  deleteGoal(id: string) {
    const goals = this.goals().filter(g => g.id !== id);
    this.goals.set(goals);
    this.save(this.STORAGE_KEYS.GOALS, goals);
    const subGoalsToDelete = this.subGoals().filter(sg => sg.goalId === id);
    subGoalsToDelete.forEach(sg => this.deleteSubGoal(sg.id));
  }

  // --- SUBGOALS ---

  addSubGoal(subGoal: Omit<SubGoal, 'id' | 'createdAt'>) {
    const newSubGoal = { ...subGoal, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const subGoals = [...this.subGoals(), newSubGoal];
    this.subGoals.set(subGoals);
    this.save(this.STORAGE_KEYS.SUB_GOALS, subGoals);
  }

  deleteSubGoal(id: string) {
    const subGoals = this.subGoals().filter(sg => sg.id !== id);
    this.subGoals.set(subGoals);
    this.save(this.STORAGE_KEYS.SUB_GOALS, subGoals);
    const tasks = this.tasks().filter(t => t.subGoalId !== id);
    this.tasks.set(tasks);
    this.save(this.STORAGE_KEYS.TASKS, tasks);
  }

  // --- TASKS ---

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'status'>) {
    const newTask: Task = { 
      ...task, 
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const tasks = [...this.tasks(), newTask];
    this.tasks.set(tasks);
    this.save(this.STORAGE_KEYS.TASKS, tasks);
  }

  updateTask(task: Task) {
    const tasks = this.tasks().map(t => t.id === task.id ? task : t);
    this.tasks.set(tasks);
    this.save(this.STORAGE_KEYS.TASKS, tasks);
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    const tasks = this.tasks().map(t => t.id === taskId ? { ...t, status } : t);
    this.tasks.set(tasks);
    this.save(this.STORAGE_KEYS.TASKS, tasks);
  }

  deleteTask(id: string) {
    const tasks = this.tasks().filter(t => t.id !== id);
    this.tasks.set(tasks);
    this.save(this.STORAGE_KEYS.TASKS, tasks);
  }

  // --- DAILY LOGS ---

  addDailyLog(log: Omit<DailyLog, 'id'>) {
    const newLog = { ...log, id: Date.now().toString() };
    const logs = [...this.dailyLogs(), newLog];
    this.dailyLogs.set(logs);
    this.save(this.STORAGE_KEYS.DAILY_LOGS, logs);

    if (log.type === 'progress' && log.taskId && log.status) {
      this.updateTaskStatus(log.taskId, log.status);
    }
  }

  deleteDailyLog(id: string) {
    const logs = this.dailyLogs().filter(l => l.id !== id);
    this.dailyLogs.set(logs);
    this.save(this.STORAGE_KEYS.DAILY_LOGS, logs);
  }

  // --- HELPERS ---

  getSubGoalsForGoal(goalId: string) {
    return this.subGoals().filter(sg => sg.goalId === goalId);
  }

  getTasksForSubGoal(subGoalId: string) {
    return this.tasks().filter(t => t.subGoalId === subGoalId);
  }

  getGoalDuration(goalId: string): string {
    const sgs = this.getSubGoalsForGoal(goalId);
    if (sgs.length === 0) return 'No sub-goals';
    const startDates = sgs.map(sg => sg.startDate).filter(d => !!d).sort();
    const endDates = sgs.map(sg => sg.endDate).filter(d => !!d).sort().reverse();
    if (startDates.length === 0 || endDates.length === 0) return 'Dates not set';
    return `${startDates[0]} to ${endDates[0]}`;
  }

  getGoalProgress(goalId: string): number {
    const sgs = this.getSubGoalsForGoal(goalId);
    if (sgs.length === 0) return 0;
    const totalProgress = sgs.reduce((sum, sg) => sum + this.getSubGoalProgress(sg.id), 0);
    return Math.round(totalProgress / sgs.length);
  }

  getSubGoalProgress(subGoalId: string): number {
    const sgTasks = this.getTasksForSubGoal(subGoalId);
    if (sgTasks.length === 0) return 0;
    const completedCount = sgTasks.filter(t => t.status === 'completed').length;
    return Math.round((completedCount / sgTasks.length) * 100);
  }

  addCategory(name: string) {
    const newCategory = { id: Date.now().toString(), name };
    const categories = [...this.categories(), newCategory];
    this.categories.set(categories);
    this.save(this.STORAGE_KEYS.CATEGORIES, categories);
  }

  addNote(note: Omit<Note, 'id' | 'createdAt'>) {
    const newNote = { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const notes = [...this.notes(), newNote];
    this.notes.set(notes);
    this.save(this.STORAGE_KEYS.NOTES, notes);
  }

  updateNote(note: Note) {
    const notes = this.notes().map(n => n.id === note.id ? note : n);
    this.notes.set(notes);
    this.save(this.STORAGE_KEYS.NOTES, notes);
  }

  deleteNote(id: string) {
    const notes = this.notes().filter(n => n.id !== id);
    this.notes.set(notes);
    this.save(this.STORAGE_KEYS.NOTES, notes);
  }

  getTodayDate(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  }
}
