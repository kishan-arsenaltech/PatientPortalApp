import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'ah.theme';
  public currentTheme = signal<Theme>('light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = (localStorage.getItem(this.THEME_KEY) as Theme) || 'light';
    this.setTheme(savedTheme);
  }

  public setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  public toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
