import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/rinjo';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { email, password });
  }

  rol: string = 'ADMIN';
  getRol(): string {
    return this.rol;
  }
  setRol(nuevoRol: string) {
    this.rol = nuevoRol;
  }
  isAdmin(): boolean {
    return this.rol === 'ADMIN';
  }

}
