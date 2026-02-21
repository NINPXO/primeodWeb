import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService, Goal, SubGoal, Task, TaskType, TaskLink, TaskFile } from '../../services/storage.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  storage = inject(StorageService);
  
  viewDate = signal(new Date());
  selectedSubGoalId: string = '';

  showSubGoalModal = false;
  showTaskModal = false;

  newSubGoal = {
    goalId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  };

  newTask = {
    title: '',
    description: '',
    duration: '',
    targetEndDate: '',
    subtask: '',
    frequency: '',
    type: 'practice' as TaskType,
    links: [] as TaskLink[],
    files: [] as TaskFile[]
  };

  newLink = { title: '', url: '' };
  editingTask: Task | null = null;

  monthLabel = computed(() => {
    return this.viewDate().toLocaleString('default', { month: 'long', year: 'numeric' });
  });

  filteredSubGoals = computed(() => {
    const date = this.viewDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    return this.storage.subGoals().filter(sg => {
      if (!sg.startDate) return false;
      const start = new Date(sg.startDate);
      return start.getMonth() === month && start.getFullYear() === year;
    }).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
  });

  prevMonth() {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() - 1);
    this.viewDate.set(d);
  }

  nextMonth() {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() + 1);
    this.viewDate.set(d);
  }

  goToCurrentMonth() {
    this.viewDate.set(new Date());
  }

  openSubGoalModal() {
    this.showSubGoalModal = true;
  }

  closeSubGoalModal() {
    this.showSubGoalModal = false;
    this.newSubGoal = { goalId: '', title: '', description: '', startDate: '', endDate: '' };
  }

  addSubGoal() {
    if (this.newSubGoal.title && this.newSubGoal.goalId) {
      this.storage.addSubGoal({
        ...this.newSubGoal
      });
      this.closeSubGoalModal();
    }
  }

  deleteSubGoal(id: string) {
    if (confirm('Delete this sub-goal and all its tasks?')) {
      this.storage.deleteSubGoal(id);
      if (this.selectedSubGoalId === id) this.selectedSubGoalId = '';
    }
  }

  openTaskModal(subGoalId: string, task?: Task) {
    this.selectedSubGoalId = subGoalId;
    if (task) {
      this.editingTask = { ...task };
      this.newTask = {
        title: task.title,
        description: task.description,
        duration: task.duration,
        targetEndDate: task.targetEndDate,
        subtask: task.subtask,
        frequency: task.frequency,
        type: task.type,
        links: [...(task.links || [])],
        files: [...(task.files || [])]
      };
    } else {
      this.editingTask = null;
      this.newTask = { title: '', description: '', duration: '', targetEndDate: '', subtask: '', frequency: '', type: 'practice', links: [], files: [] };
    }
    this.newLink = { title: '', url: '' };
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
    this.editingTask = null;
    this.newTask = { title: '', description: '', duration: '', targetEndDate: '', subtask: '', frequency: '', type: 'practice', links: [], files: [] };
  }

  addLink() {
    if (this.newLink.url) {
      this.newTask.links.push({ 
        title: this.newLink.title || this.newLink.url, 
        url: this.newLink.url.startsWith('http') ? this.newLink.url : `https://${this.newLink.url}` 
      });
      this.newLink = { title: '', url: '' };
    }
  }

  removeLink(index: number) {
    this.newTask.links.splice(index, 1);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newTask.files.push({
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index: number) {
    this.newTask.files.splice(index, 1);
  }

  saveTask() {
    if (this.newTask.title && this.selectedSubGoalId) {
      if (this.editingTask) {
        this.storage.updateTask({
          ...this.editingTask,
          ...this.newTask
        });
      } else {
        this.storage.addTask({
          ...this.newTask,
          subGoalId: this.selectedSubGoalId
        });
      }
      this.closeTaskModal();
    }
  }

  deleteTask(id: string) {
    if (confirm('Delete this task?')) {
      this.storage.deleteTask(id);
    }
  }

  getTasks(subGoalId: string) {
    return this.storage.getTasksForSubGoal(subGoalId);
  }

  getSubGoalProgress(subGoalId: string) {
    return this.storage.getSubGoalProgress(subGoalId);
  }

  getGoalTitle(goalId: string) {
    return this.storage.goals().find(g => g.id === goalId)?.title || 'Unknown Goal';
  }
}
