import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { Observable, tap, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'auth_user';

  // Using signals for reactive state management
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loadInitialState();
  }

  private loadInitialState(): void {
    const token = this.getToken();
    const userStr = this.storageService.getCookie(this.USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (e) {
        this.clearSession();
      }
    } else {
      this.clearSession();
    }
  }

  login(credentials: AuthRequest, rememberMe: boolean): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        const days = rememberMe ? 14 : undefined;
        this.storageService.setCookie(this.TOKEN_KEY, response.token, days);
        this.storageService.setCookie(this.REFRESH_TOKEN_KEY, response.refreshToken, days);
        this.storageService.setCookie(this.USER_KEY, JSON.stringify(response.user), days);
        
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService.post<AuthResponse>('/auth/refresh', { refreshToken }).pipe(
      tap(response => {
        // We preserve the existing session cookie status (we don't know the exact days left, 
        // but typically a refreshed token could just be a session cookie again or we renew it.
        // For simplicity, we just use session cookies here unless we store the rememberMe preference).
        this.storageService.setCookie(this.TOKEN_KEY, response.token);
        this.storageService.setCookie(this.REFRESH_TOKEN_KEY, response.refreshToken);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return this.storageService.getCookie(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.storageService.getCookie(this.REFRESH_TOKEN_KEY);
  }

  private clearSession(): void {
    this.storageService.removeCookie(this.TOKEN_KEY);
    this.storageService.removeCookie(this.REFRESH_TOKEN_KEY);
    this.storageService.removeCookie(this.USER_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
