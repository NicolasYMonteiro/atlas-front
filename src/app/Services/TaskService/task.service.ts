// Service

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = `${environment.api}/task` // import Url de api

  constructor(private http: HttpClient) { }

  token(): string | null {
    if (typeof localStorage != 'undefined') {
      return localStorage.getItem('authToken');
    } else {
      return null
    }
  }

  getTaskData() {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.get<any>(this.url, { headers });
    } else {
      return of(null);
    }
  }

  postTask(task: any) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.post<any>(this.url, task, { headers });
    } else {
      return of(null);
    }

  }

  delTask(id: number) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.delete<any>(`${this.url}/${id}`, { headers })
    } else {
      return of(null);
    }
  }

  patchTask(id: number, data: object) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.patch<any>(`${this.url}/${id}`, data, { headers })
    } else {
      return of(null);
    }
  }

  completTask(id: number) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.post<any>(`${this.url}/complete/${id}`, { headers })
    } else {
      return of(null);
    }
  }

  getCompletTask() {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.post<any>(`${this.url}/complete`, { headers })
    } else {
      return of(null);
    }
  }
}
