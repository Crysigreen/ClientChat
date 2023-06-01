import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string = '';
  tokenSubject: BehaviorSubject<string | null>;

  public MyId!: string;
  public MyUsername!: string ;

  private apiUrl = 'https://localhost:7185/api/Users'; // Замените на URL вашего сервера
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth-token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // login(id: string, username: string, password: string): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/login`, {id, username, password });
  // }

  get token1(): string | null {
    return this.tokenSubject.value;
  }

  login(username: string, password: string) {
    this.MyUsername=username;
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {}, { params })
      .pipe(tap(({token}) => {
        this.token = token;
        this.tokenSubject.next(token);
        localStorage.setItem('username', username);
        localStorage.setItem('auth-token', token);
      }));
  }

  getToken() {
    return this.tokenSubject.asObservable();
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
