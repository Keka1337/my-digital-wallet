import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';

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
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user: User) => {
        if (user) {
          return !!user.token; //proveravamo token i vrsimo konverziju u boolean
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user: User) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  registrujSe(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, //u endpoint ubacujemo kljuc
        { email: user.email, password: user.password, returnSecureToken: true } //zahtevani parametri u telu post metode
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user); //nad nasim subject-om emitujemo vrednost user-a
        })
      );
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=${environment.firebaseConfig.apiKey}`, //u endpoint ubacujemo kljuc
        { email: user.email, password: user.password, returnSecureToken: true } //zahtevani parametri u telu post metode
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user); //nad nasim subject-om emitujemo vrednost user-a
        })
      );
  }

  logOut() {
    this._user.next(null);
  }
}
