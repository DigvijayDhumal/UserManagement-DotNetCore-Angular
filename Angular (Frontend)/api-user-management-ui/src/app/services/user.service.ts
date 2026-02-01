import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

  // 🔥 BACKEND PORT FIX
  private apiUrl = 'http://localhost:5118/api';

  constructor(private http: HttpClient) {}

  // GET USERS
  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // ADD USER
  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }
}
