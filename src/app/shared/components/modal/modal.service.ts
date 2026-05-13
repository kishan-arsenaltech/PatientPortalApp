import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeModal = signal<string | null>(null);

  open(modalId: string): void {
    this.activeModal.set(modalId);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.activeModal.set(null);
    document.body.style.overflow = '';
  }

  isOpen(modalId: string): boolean {
    return this.activeModal() === modalId;
  }
}
