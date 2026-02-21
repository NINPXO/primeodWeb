import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService, Goal, SubGoal, Task, TaskStatus } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  storage = inject(StorageService);

  selectedDate = signal(new Date());

  get today(): Date {
    return this.selectedDate();
  }

  get todayStr(): string {
    return this.today.toISOString().split('T')[0];
  }

  maxDate = new Date().toISOString().split('T')[0];

  get todayDate(): string {
    return this.storage.getTodayDate();
  }

  // --- TASK CATEGORIZATION ---

  private getTasksByPeriod(start: Date, end: Date) {
    const subGoals = this.storage.subGoals();
    const tasks = this.storage.tasks();

    // Find subgoals that overlap with this period
    const relevantSubGoals = subGoals.filter(sg => {
      if (!sg.startDate || !sg.endDate) return false;
      const sgStart = new Date(sg.startDate);
      const sgEnd = new Date(sg.endDate);
      return sgStart <= end && sgEnd >= start;
    });

    const sgIds = new Set(relevantSubGoals.map(sg => sg.id));
    return tasks.filter(t => sgIds.has(t.subGoalId));
  }

  todayPendingTasks = computed(() => {
    const start = new Date(this.today);
    start.setHours(0,0,0,0);
    const end = new Date(this.today);
    end.setHours(23,59,59,999);
    
    return this.getTasksByPeriod(start, end).filter(t => t.status !== 'completed');
  });

  weekPendingTasks = computed(() => {
    const start = new Date(this.today);
    start.setDate(this.today.getDate() - this.today.getDay());
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23,59,59,999);

    return this.getTasksByPeriod(start, end).filter(t => t.status !== 'completed');
  });

  backlogTasks = computed(() => {
    const subGoals = this.storage.subGoals();
    const tasks = this.storage.tasks();
    const now = new Date();

    const overdueSubGoals = subGoals.filter(sg => {
      if (!sg.endDate) return false;
      const sgEnd = new Date(sg.endDate);
      return sgEnd < now;
    });

    const sgIds = new Set(overdueSubGoals.map(sg => sg.id));
    return tasks.filter(t => sgIds.has(t.subGoalId) && t.status !== 'completed');
  });

  // --- PROGRESS METRICS ---

  dailyProgress = computed(() => {
    const start = new Date(this.today);
    start.setHours(0,0,0,0);
    const end = new Date(this.today);
    end.setHours(23,59,59,999);
    return this.calculateProgress(start, end);
  });

  weeklyProgress = computed(() => {
    const start = new Date(this.today);
    start.setDate(this.today.getDate() - this.today.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return this.calculateProgress(start, end);
  });

  monthlyProgress = computed(() => {
    const start = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    const end = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    return this.calculateProgress(start, end);
  });

  private calculateProgress(start: Date, end: Date): number {
    const periodTasks = this.getTasksByPeriod(start, end);
    if (periodTasks.length === 0) return 0;
    const completed = periodTasks.filter(t => t.status === 'completed').length;
    return Math.round((completed / periodTasks.length) * 100);
  }

  // --- HELPERS ---

  getGoalTitle(subGoalId: string): string {
    const sg = this.storage.subGoals().find(s => s.id === subGoalId);
    if (!sg) return 'Goal';
    return this.storage.goals().find(g => g.id === sg.goalId)?.title || 'Goal';
  }

  getGoalProgress(goalId: string): number {
    return this.storage.getGoalProgress(goalId);
  }

  // --- DATE SELECTOR ---

  onDateChange(dateStr: string) {
    const newDate = new Date(dateStr);
    this.selectedDate.set(newDate);
  }

  goToToday() {
    this.selectedDate.set(new Date());
  }
}
