import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transakcija } from './transakcija.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface TransakcijaPodaci {
  naslov: string;
  podnaslov: string;
  kategorija: string;
  iznos: number;
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
      iznos: 100,
    },
    {
      id: '2',
      naslov: 'Porez',
      podnaslov: 'Mesec jul',
      kategorija: 'Odliv',
      iznos: 1000,
    },
  ];

  constructor(private http: HttpClient) {}

  dodaj(naslov: string, podnaslov: string, kategorija: string, iznos: number) {
    let generatedId;

    return this.http //kao odgovor od firebase-a dobijamo id kreirane transakcije
      .post<{ name: string }>(
        'https://my-digital-wallet-7752b-default-rtdb.europe-west1.firebasedatabase.app/transakcije.json',
        {
          naslov,
          podnaslov,
          kategorija,
          iznos,
        }
      )
      .pipe(
        //kroz pipe presrecemo odgovor (id transakcije)
        switchMap((resultData) => {
          //kroz switchMap menjamo observable na nas poslednji emitovani niz transakcija
          generatedId = resultData.name;
          return this._transakcije;
        }),
        take(1), //uzimamo samo jedan objekat
        tap((transakcije) => {
          //uzimamo poslednji niz transakcija i prosirujemo ga za novokreiranu transakciju
          this._transakcije.next(
            transakcije.concat({
              id: generatedId,
              naslov,
              podnaslov,
              kategorija,
              iznos,
            })
          );
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
              transakcije.push({
                id: key,
                naslov: transakcijaPodaci[key].naslov,
                podnaslov: transakcijaPodaci[key].podnaslov,
                kategorija: transakcijaPodaci[key].kategorija,
                iznos: transakcijaPodaci[key].iznos,
              });
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
