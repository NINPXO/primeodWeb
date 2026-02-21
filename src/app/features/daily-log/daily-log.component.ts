import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService, DailyLog, Goal, SubGoal, Task, LogType, TaskStatus } from '../../services/storage.service';
import { ModalComponent } from '../../components/modal/modal.component';

export type ViewMode = 'day' | 'week' | 'month';

@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './daily-log.component.html',
  styleUrl: './daily-log.component.scss'
})
export class DailyLogComponent {
  storage = inject(StorageService);
  
  viewMode = signal<ViewMode>('day');
  selectedDate = signal<string>(new Date().toISOString().split('T')[0]);
  
  newLog: Partial<DailyLog> = { 
    title: '', 
    content: '', 
    date: new Date().toISOString().split('T')[0],
    type: 'normal',
    status: 'pending'
  };
  showModal = false;

  // Selections for Progress Log
  selectedGoalId = '';
  selectedSubGoalId = '';
  selectedTaskId = '';

  get maxDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  filteredLogs = computed(() => {
    const logs = this.storage.dailyLogs();
    const mode = this.viewMode();
    const dateStr = this.selectedDate();
    const selected = new Date(dateStr);

    if (mode === 'day') {
      return logs.filter(l => l.date === dateStr);
    } else if (mode === 'week') {
      const start = new Date(selected);
      start.setDate(selected.getDate() - selected.getDay()); // Sunday
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      return logs.filter(l => {
        const d = new Date(l.date);
        return d >= start && d <= end;
      }).sort((a, b) => b.date.localeCompare(a.date));
    } else {
      const month = selected.getMonth();
      const year = selected.getFullYear();
      return logs.filter(l => {
        const d = new Date(l.date);
        return d.getMonth() === month && d.getFullYear() === year;
      }).sort((a, b) => b.date.localeCompare(a.date));
    }
  });

  get viewLabel(): string {
    const date = new Date(this.selectedDate());
    if (this.viewMode() === 'day') {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (this.viewMode() === 'week') {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  }

  setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  get allGoals(): Goal[] {
    return this.storage.goals();
  }

  get availableSubGoals(): SubGoal[] {
    return this.storage.getSubGoalsForGoal(this.selectedGoalId);
  }

  get availableTasks(): Task[] {
    return this.storage.getTasksForSubGoal(this.selectedSubGoalId);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newLog = { 
      title: '', 
      content: '', 
      date: new Date().toISOString().split('T')[0],
      type: 'normal',
      status: 'pending'
    };
    this.selectedGoalId = '';
    this.selectedSubGoalId = '';
    this.selectedTaskId = '';
  }

  addLog() {
    if (this.newLog.title && this.newLog.content && this.newLog.date) {
      if (this.newLog.date > this.maxDate) {
        alert('Cannot add logs for future dates.');
        return;
      }

      const logData: Omit<DailyLog, 'id'> = {
        title: this.newLog.title!,
        content: this.newLog.content!,
        date: this.newLog.date!,
        type: this.newLog.type as LogType,
        goalId: this.selectedGoalId || undefined,
        subGoalId: this.selectedSubGoalId || undefined,
        taskId: this.selectedTaskId || undefined,
        status: this.newLog.status as TaskStatus
      };

      this.storage.addDailyLog(logData);
      this.closeModal();
    }
  }

  deleteLog(id: string) {
    if (confirm('Delete this log entry?')) {
      this.storage.deleteDailyLog(id);
    }
  }

  getStatusColor(status?: string): string {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#3b82f6';
      case 'pending': return '#94a3b8';
      default: return '#999';
    }
  }

  getLogTypeLabel(type: LogType): string {
    return type === 'progress' ? '📈 Progress' : '📝 Note';
  }
}
