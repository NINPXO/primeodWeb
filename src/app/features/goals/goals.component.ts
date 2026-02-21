import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService, Goal } from '../../services/storage.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss'
})
export class GoalsComponent {
  storage = inject(StorageService);
  
  showModal = false;
  
  newGoal = {
    title: '',
    description: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newGoal = {
      title: '',
      description: ''
    };
  }

  addGoal() {
    if (this.newGoal.title) {
      this.storage.addGoal(this.newGoal);
      this.closeModal();
    }
  }

  deleteGoal(id: string) {
    if (confirm('Are you sure you want to delete this goal and all its sub-goals and tasks?')) {
      this.storage.deleteGoal(id);
    }
  }

  getGoalProgress(goalId: string): number {
    return this.storage.getGoalProgress(goalId);
  }

  getGoalDuration(goalId: string): string {
    return this.storage.getGoalDuration(goalId);
  }
}
