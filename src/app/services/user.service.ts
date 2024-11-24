import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  apiURLUsers = `${URL_SERVICIOS}/User`;

  async getUser(userId: string) {
    try {
      const response = await this.http.get<any>(`${this.apiURLUsers}/find/${userId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading user', error);
    }
  }

  async updateUser(user: any) {
    try {
      const response = await this.http.put<any>(`${this.apiURLUsers}/${user._id}`, user).toPromise();
      return response;
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  async deleteUser(userId: string) {
    try {
      const response = await this.http.delete<any>(`${this.apiURLUsers}/${userId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  async getUsers() {
    try {
      const response = await this.http.get<any>(`${this.apiURLUsers}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading users', error);
    }
  }

  async createUser(user: any) {
    try {
      const response = await this.http.post<any>(`${this.apiURLUsers}`, user).toPromise();
      return response;
    } catch (error) {
      console.error('Error creating user', error);
    }
  }

  async login(username: string, password: string) {
    try {
      const response = await this.http.post<any>(`${this.apiURLUsers}/login`, {username, password}).toPromise();
      return response;
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
}
