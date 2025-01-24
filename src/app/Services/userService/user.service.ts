import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private urlUser = `${environment.api}/user`;
  private urlLogin = `${environment.api}/login`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  token(): string | null {
    if (typeof localStorage != 'undefined') {
      return localStorage.getItem('authToken');
    } else {
      return null
    }
  }

  getUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.token();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        return this.http.get<any>(`${this.urlLogin}`, { headers });
      } else {
        return of(null); // Retorne um Observable vazio ou um valor padrão
      }
    } else {
      return of(null); // Retorne um Observable vazio ou um valor padrão
    }
  }

  postUser(user: User) {
    return this.http.post<any>(this.urlUser, user);
  }

  postLogin(credentials: { email: string; password: string }) {
    return this.http.post<any>(this.urlLogin, credentials);
  }
}
