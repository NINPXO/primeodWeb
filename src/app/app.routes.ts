import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DailyLogComponent } from './features/daily-log/daily-log.component';
import { ProgressComponent } from './features/progress/progress.component';
import { GoalsComponent } from './features/goals/goals.component';
import { NotesComponent } from './features/notes/notes.component';
import { DataManagementComponent } from './features/data-management/data-management.component';
import { LearningPlanComponent } from './features/learning-plan/learning-plan.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'daily-log', component: DailyLogComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'learning-plan', component: LearningPlanComponent },
  { path: 'data', component: DataManagementComponent },
];
