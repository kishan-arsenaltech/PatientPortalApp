import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private idCounter = 0;

  show(type: ToastType, title: string, message: string, duration = 4200): void {
    const id = `toast-${this.idCounter++}`;
    const newToast: ToastMessage = { id, type, title, message };
    
    this.toasts.update(current => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: string): void {
    // Usually we want an animation, but for simplicity we just remove it here
    // A more advanced implementation might use a timeout or animation callbacks
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
