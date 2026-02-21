import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Data Management</h1>
        <p class="subtitle">Import, export, and manage your application data</p>
      </div>

      <div class="data-grid">
        <div class="data-card">
          <div class="card-icon">📁</div>
          <h3>Export Data</h3>
          <p>Download all your goals, tasks, and logs as a JSON file for backup.</p>
          <button class="btn" (click)="exportData()">Export to JSON</button>
        </div>

        <div class="data-card">
          <div class="card-icon">📤</div>
          <h3>Import Data</h3>
          <p>Upload a previously exported JSON file to restore your data.</p>
          <input type="file" #fileInput (change)="onFileSelected($event)" style="display: none" accept=".json">
          <button class="btn" (click)="fileInput.click()">Import from JSON</button>
        </div>

        <div class="data-card">
          <div class="card-icon">🔄</div>
          <h3>Reset to Seed</h3>
          <p>Clear all current data and restore the default learning tracks (GATE, Upskill).</p>
          <button class="btn-secondary" (click)="resetToSeed()">Reset to Default</button>
        </div>

        <div class="data-card danger">
          <div class="card-icon">⚠️</div>
          <h3>Clear All Data</h3>
          <p>Permanently delete all data from local storage. This cannot be undone.</p>
          <button class="btn-danger" (click)="clearAllData()">Wipe Everything</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 2.5rem; text-align: center; }
    h1 { font-size: 2.2rem; color: #1e293b; margin-bottom: 0.5rem; }
    .subtitle { color: #64748b; font-size: 1.1rem; }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .data-card {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s;

      &:hover { transform: translateY(-4px); }
      &.danger { border: 1px solid #fee2e2; }

      .card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
      h3 { font-size: 1.25rem; color: #1e293b; margin-bottom: 0.75rem; }
      p { font-size: 0.95rem; color: #64748b; margin-bottom: 1.5rem; line-height: 1.5; flex: 1; }
    }

    .btn { background: #3760f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%; transition: opacity 0.2s; &:hover { opacity: 0.9; } }
    .btn-secondary { background: #f1f5f9; color: #475569; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%; &:hover { background: #e2e8f0; } }
    .btn-danger { background: #ef4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%; &:hover { background: #dc2626; } }
  `]
})
export class DataManagementComponent {
  storage = inject(StorageService);

  exportData() {
    const data = this.storage.exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `primeos_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = JSON.parse(e.target.result);
          if (confirm('Importing data will merge/overwrite your current data. Continue?')) {
            this.storage.importAllData(data);
            alert('Data imported successfully!');
            window.location.reload();
          }
        } catch (err) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  }

  resetToSeed() {
    if (confirm('This will restore the original learning tracks and delete your custom logs/notes. Continue?')) {
      this.storage.resetToSeed();
      window.location.reload();
    }
  }

  clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This action is permanent.')) {
      this.storage.clearAllData();
      window.location.reload();
    }
  }
}
