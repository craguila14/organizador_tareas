import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    if (this.isBrowser()) {
      this.checkLogin();
    }
  }

  register(user: { nombre: string, email: string; password: string }) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/registrarse`, user).pipe(
      tap((response) => {
        const token = response.token;
        if (token) {
          this.setTokenInCookies(token);
          this.isLoggedInSubject.next(true);
        }
      })

    );
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        const token = response.token;
        if (token) {
          this.setTokenInCookies(token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    this.deleteTokenFromCookies();
    this.isLoggedInSubject.next(false);
  }

  getAuthToken(): string | null {
    return this.getTokenFromCookies();
  }

  
  checkLogin(): void {
    const token = this.getTokenFromCookies();
    this.isLoggedInSubject.next(!!token);
  }

  isAuthenticated(): boolean {
    return !!this.getTokenFromCookies();
  }

  private setTokenInCookies(token: string) {
    if (this.isBrowser()) {
      document.cookie = `token=${token}; path=/;`;
    }
  }

  private getTokenFromCookies(): string | null {
    if (!this.isBrowser()) return null;
    const match = document.cookie.match(/(^|;) ?token=([^;]+)/);
    return match ? match[2] : null;
  }

  private deleteTokenFromCookies() {
    if (this.isBrowser()) {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
