import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService, Goal, SubGoal, Task, DailyLog } from '../../services/storage.service';

@Component({
  selector: 'app-learning-plan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './learning-plan.component.html',
  styleUrl: './learning-plan.component.scss'
})
export class LearningPlanComponent {
  storage = inject(StorageService);

  // Track which goal is expanded for full details
  expandedGoalId = signal<string | null>(null);

  summary = computed(() => {
    const goals = this.storage.goals();
    const subGoals = this.storage.subGoals();
    const logs = this.storage.dailyLogs();

    return goals.map(goal => {
      const goalSubGoals = subGoals.filter(sg => sg.goalId === goal.id);
      const progress = this.storage.getGoalProgress(goal.id);
      const duration = this.storage.getGoalDuration(goal.id);
      
      const recentLogs = logs
        .filter(l => l.goalId === goal.id)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3);

      const today = new Date().toISOString().split('T')[0];
      const nextSubGoal = goalSubGoals
        .filter(sg => sg.startDate && sg.startDate >= today)
        .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))[0];

      // Add full tree data for expanded view
      const detailedSubGoals = goalSubGoals.map(sg => ({
        ...sg,
        progress: this.storage.getSubGoalProgress(sg.id),
        tasks: this.storage.getTasksForSubGoal(sg.id)
      })).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));

      return {
        ...goal,
        progress,
        duration,
        subGoalCount: goalSubGoals.length,
        completedSubGoals: goalSubGoals.filter(sg => this.storage.getSubGoalProgress(sg.id) === 100).length,
        recentLogs,
        nextSubGoal,
        detailedSubGoals
      };
    });
  });

  toggleExpand(goalId: string) {
    if (this.expandedGoalId() === goalId) {
      this.expandedGoalId.set(null);
    } else {
      this.expandedGoalId.set(goalId);
    }
  }

  getOverallAverageProgress() {
    const data = this.summary();
    if (data.length === 0) return 0;
    const total = data.reduce((sum, g) => sum + g.progress, 0);
    return Math.round(total / data.length);
  }

  getTotalLogsCount() {
    return this.storage.dailyLogs().length;
  }
}
