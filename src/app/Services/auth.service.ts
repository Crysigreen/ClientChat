import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public MyId!: string;
  public username!: string;

  private apiUrl = 'https://localhost:7185/api/Users'; // Замените на URL вашего сервера
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(id: string, username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, {id, username, password });
  }

  isAuthenticated(): boolean {
    // Replace this logic with your actual authentication check
    const currentUser = this.currentUserSubject.value;
    return currentUser !== null; // Example: Check if a user object exists
  }
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
