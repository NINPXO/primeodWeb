import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService, Note } from '../../services/storage.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  storage = inject(StorageService);
  
  newNote = { title: '', content: '', category: '' };
  showModal = false;
  showAddCategory = false;
  newCategory = '';

  editingNote: Note | null = null;

  openModal(note?: Note) {
    if (note) {
      this.editingNote = { ...note };
      this.newNote = {
        title: note.title,
        content: note.content,
        category: note.category
      };
    } else {
      this.editingNote = null;
      this.newNote = { title: '', content: '', category: '' };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newNote = { title: '', content: '', category: '' };
    this.showAddCategory = false;
    this.newCategory = '';
    this.editingNote = null;
  }

  saveNote() {
    if (this.newNote.content) {
      if (this.editingNote) {
        this.storage.updateNote({
          ...this.editingNote,
          ...this.newNote
        });
      } else {
        this.storage.addNote(this.newNote);
      }
      this.closeModal();
    }
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.storage.addCategory(this.newCategory.trim());
      this.newNote.category = this.newCategory.trim();
      this.newCategory = '';
      this.showAddCategory = false;
    }
  }

  deleteNote(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.storage.deleteNote(id);
    }
  }
}
