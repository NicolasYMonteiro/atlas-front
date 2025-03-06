// Service

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../Models/task.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {
  private url = `${environment.api}/subtask` // import Url de api

  constructor(private http: HttpClient) { }

  token(): string | null {
    if (typeof localStorage != 'undefined') {
      return localStorage.getItem('authToken');
    } else {
      return null
    }
  }

  getByTask(idTask: number) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.get<any>(`${this.url}/${idTask}`, { headers });
    } else {
      return of(null);
    }
  }

  postSubTask(idTask: number, subtask: string[]) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.post<any>(`${this.url}/${idTask}`, subtask, { headers });
    } else {
      return of(null);
    }

  }

  patchTask(updates: Array<{ id: number, field: string; value: any }>, idTask: number) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.patch<any>(`${this.url}/${idTask}`, updates, { headers })
    } else {
      return of(null);
    }
  }

/*
  delTask(id: number) {
    const token = this.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      return this.http.delete<any>(`${this.url}/${id}`, { headers })
    } else {
      return of(null);
    }
  }
*/
}
