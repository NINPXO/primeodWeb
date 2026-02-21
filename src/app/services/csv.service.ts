import { Injectable, inject } from '@angular/core';
import { StorageService, DailyLog, Goal, Note, GoalTarget, GoalFrequency } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private storage = inject(StorageService);

  exportDailyLogs(): void {
    const logs = this.storage.dailyLogs();
    const headers = ['id', 'title', 'content', 'date'];
    const rows = logs.map(l => [l.id, l.title, l.content, l.date]);
    this.downloadCsv('daily-logs.csv', headers, rows);
  }

  exportGoals(): void {
    const goals = this.storage.goals();
    const headers = ['id', 'title', 'description', 'category', 'startDate', 'endDate', 'frequency', 'completed', 'createdAt', 'targets'];
    const rows = goals.map(g => [
      g.id, 
      g.title, 
      g.description, 
      g.category, 
      g.startDate, 
      g.endDate, 
      g.frequency, 
      g.completed ? 'true' : 'false', 
      g.createdAt,
      g.targets.map(t => t.title).join(';')
    ]);
    this.downloadCsv('goals.csv', headers, rows);
  }

  exportNotes(): void {
    const notes = this.storage.notes();
    const headers = ['id', 'title', 'content', 'category', 'createdAt'];
    const rows = notes.map(n => [n.id, n.title, n.content, n.category, n.createdAt]);
    this.downloadCsv('notes.csv', headers, rows);
  }

  exportAll(): void {
    this.exportDailyLogs();
    this.exportGoals();
    this.exportNotes();
  }

  importDailyLogs(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = this.parseCsvLine(lines[0]);
        
        for (let i = 1; i < lines.length; i++) {
          const values = this.parseCsvLine(lines[i]);
          if (values.length >= 3) {
            const log: Omit<DailyLog, 'id'> = {
              title: values[headers.indexOf('title')] || values[1] || '',
              content: values[headers.indexOf('content')] || values[2] || '',
              date: values[headers.indexOf('date')] || values[3] || new Date().toISOString().split('T')[0]
            };
            if (log.title) {
              this.storage.addDailyLog(log);
            }
          }
        }
        resolve();
      };
      reader.readAsText(file);
    });
  }

  importGoals(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = this.parseCsvLine(lines[0]);
        
        for (let i = 1; i < lines.length; i++) {
          const values = this.parseCsvLine(lines[i]);
          if (values.length >= 2) {
            const titleIdx = headers.indexOf('title');
            const title = titleIdx >= 0 ? values[titleIdx] : values[1];
            
            if (title) {
              const goal: Omit<Goal, 'id' | 'createdAt'> = {
                title: title,
                description: headers.indexOf('description') >= 0 ? values[headers.indexOf('description')] || '' : '',
                category: headers.indexOf('category') >= 0 ? values[headers.indexOf('category')] || 'Personal' : 'Personal',
                startDate: headers.indexOf('startDate') >= 0 ? values[headers.indexOf('startDate')] || '' : '',
                endDate: headers.indexOf('endDate') >= 0 ? values[headers.indexOf('endDate')] || '' : '',
                frequency: (headers.indexOf('frequency') >= 0 ? values[headers.indexOf('frequency')] : 'weekly') as GoalFrequency,
                targets: [],
                completed: false
              };
              
              const targetsIdx = headers.indexOf('targets');
              if (targetsIdx >= 0 && values[targetsIdx]) {
                const targetTitles = values[targetsIdx].split(';').filter(t => t.trim());
                goal.targets = targetTitles.map(t => ({
                  id: Date.now().toString() + Math.random(),
                  title: t.trim(),
                  completed: false
                }));
              }
              
              this.storage.addGoal(goal);
            }
          }
        }
        resolve();
      };
      reader.readAsText(file);
    });
  }

  importNotes(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = this.parseCsvLine(lines[0]);
        
        for (let i = 1; i < lines.length; i++) {
          const values = this.parseCsvLine(lines[i]);
          if (values.length >= 2) {
            const contentIdx = headers.indexOf('content');
            const content = contentIdx >= 0 ? values[contentIdx] : values[2];
            
            if (content) {
              const note: Omit<Note, 'id' | 'createdAt'> = {
                title: headers.indexOf('title') >= 0 ? values[headers.indexOf('title')] || '' : values[1] || '',
                content: content,
                category: headers.indexOf('category') >= 0 ? values[headers.indexOf('category')] || '' : ''
              };
              this.storage.addNote(note);
            }
          }
        }
        resolve();
      };
      reader.readAsText(file);
    });
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  private downloadCsv(filename: string, headers: string[], rows: (string | number | boolean)[][]): void {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => {
        const str = String(cell);
        return str.includes(',') || str.includes('"') || str.includes('\n') 
          ? `"${str.replace(/"/g, '""')}"` 
          : str;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
