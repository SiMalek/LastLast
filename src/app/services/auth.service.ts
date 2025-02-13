import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private link = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.link}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  // Register method
  register(user: any): Observable<any> {
    return this.http.post(`${this.link}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    });
  }

  // Get user ID from localStorage
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('user');
  }
}