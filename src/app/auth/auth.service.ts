import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserAuthenticated = false;

  constructor(private http: HttpClient) {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }
  registrujSe(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, //u endpoint ubacujemo kljuc
      { email: user.email, password: user.password, returnSecureToken: true } //zahtevani parametri u telu post metode
    );
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=${environment.firebaseConfig.apiKey}`, //u endpoint ubacujemo kljuc
      { email: user.email, password: user.password, returnSecureToken: true } //zahtevani parametri u telu post metode
    );
  }

  logOut() {
    this._isUserAuthenticated = false;
  }
}
