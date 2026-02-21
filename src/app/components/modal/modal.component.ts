import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="modal-overlay" (click)="close.emit()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ title }}</h2>
            <button class="close-btn" (click)="close.emit()">×</button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(32, 3, 60, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 250ms ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: var(--colorLight);
      border-radius: 20px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 250ms ease;
      box-shadow: 0 20px 60px rgba(255, 46, 222, 0.2);
      position: relative;
      overflow: hidden;
    }

    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 32px;
      background: linear-gradient(135deg, #ff2ede 0%, #883fff 100%);
      color: white;
      position: relative;
    }

    .modal-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #ff2ede 0%, #ef6a14 50%, #883fff 100%);
    }

    .modal-header h2 {
      font-size: 1.4rem;
      color: white;
      margin: 0;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .close-btn {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-size: 1.8rem;
      cursor: pointer;
      color: white;
      opacity: 0.8;
      line-height: 1;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms;
      flex-shrink: 0;
    }

    .close-btn:hover {
      opacity: 1;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
      transform: scale(1.1);
    }

    .modal-body {
      padding: 32px;
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
}
