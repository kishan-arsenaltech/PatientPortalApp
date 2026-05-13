import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  /**
   * Sets a cookie.
   * @param name Name of the cookie
   * @param value Value of the cookie
   * @param days Number of days until expiration. If omitted, it creates a session cookie.
   */
  setCookie(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; Secure; SameSite=Strict`;
  }

  /**
   * Gets a cookie value.
   * @param name Name of the cookie
   */
  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Removes a cookie.
   * @param name Name of the cookie
   */
  removeCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999; path=/; Secure; SameSite=Strict`;
  }
}
