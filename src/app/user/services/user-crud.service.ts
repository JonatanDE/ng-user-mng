import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http } from '@angular/http';
import { User } from '../models/user.model';

@Injectable()
export class UserCrudService {
  constructor(private http: Http) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get('/api/user')
      .map(response => response.json() as User[]);
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post('/api/user', user)
      .map(response => response.json() as User);
  }

  updateUser(id: number, user: User): Observable<any> {
    user.id = id;
    return this.http
      .put('/api/user', user)
      .map(response => response.json());
  }

  deleteUser(id: number): Observable<any> {
    return this.http
      .delete('/api/user/' + id)
      .map(response => {
        return response.json();
      });
  }
}
