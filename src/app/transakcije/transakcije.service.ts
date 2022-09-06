import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transakcija } from './transakcija.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface TransakcijaPodaci {
  naslov: string;
  podnaslov: string;
  kategorija: string;
  tipId: string;
  iznos: number;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransakcijeService {
  private _transakcije = new BehaviorSubject<Transakcija[]>([]);

  get transakcije() {
    return this._transakcije.asObservable();
  }

  stareTransakcije: Transakcija[] = [
    {
      id: '1',
      naslov: 'Plata',
      podnaslov: 'Mesec jun',
      kategorija: 'Priliv',
      tipId: 'xx',
      iznos: 100,
      userId: 'xx',
    },
    {
      id: '2',
      naslov: 'Porez',
      podnaslov: 'Mesec jul',
      kategorija: 'Odliv',
      tipId: 'xx',
      iznos: 10011,
      userId: 'xx',
    },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  dodaj(naslov: string, podnaslov: string, kategorija: string, iznos: number) {
    let generatedId;
    let novaTransakcija: Transakcija;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        novaTransakcija = new Transakcija(
          null,
          naslov,
          podnaslov,
          kategorija,
          null,
          iznos,
          userId
        );

        return this.http //kao odgovor od firebase-a dobijamo id kreirane transakcije
          .post<{ name: string }>(
            'https://my-digital-wallet-7752b-default-rtdb.europe-west1.firebasedatabase.app/transakcije.json',
            {
              novaTransakcija,
            }
          );
      }),
      take(1),
      switchMap((resultData) => {
        //kroz switchMap menjamo observable na nas poslednji emitovani niz transakcija
        generatedId = resultData.name;
        return this._transakcije;
      }),
      take(1), //uzimamo samo jedan objekat
      tap((transakcije) => {
        //uzimamo poslednji niz transakcija i prosirujemo ga za novokreiranu transakciju
        novaTransakcija.id = generatedId;
        this._transakcije.next(transakcije.concat(novaTransakcija));
      })
    );
  }

  // Firebase generise id za ceo jedan objekat sa polajima iz interfejsa TransakcijaPodaci
  vratiSveTransakcije() {
    return this.http
      .get<{ [key: string]: TransakcijaPodaci }>(
        'https://my-digital-wallet-7752b-default-rtdb.europe-west1.firebasedatabase.app/transakcije.json'
      )
      .pipe(
        map((transakcijaPodaci) => {
          let transakcije: Transakcija[];
          for (const key in transakcijaPodaci) {
            if (transakcijaPodaci.hasOwnProperty(key)) {
              transakcije.push(
                new Transakcija(
                  key,
                  transakcijaPodaci[key].naslov,
                  transakcijaPodaci[key].podnaslov,
                  transakcijaPodaci[key].kategorija,
                  null,
                  transakcijaPodaci[key].iznos,
                  transakcijaPodaci[key].userId
                )
              );
            }
          }
          return transakcije;
        }),
        tap((transakcije) => {
          this._transakcije.next(transakcije);
        })
      );
  }

  vratiTransakciju(id: string) {
    return this.stareTransakcije.find((t) => t.id === id);
  }
}
