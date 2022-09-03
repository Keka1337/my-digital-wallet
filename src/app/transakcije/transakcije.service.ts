import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transakcija } from './transakcija.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransakcijeService {
  private _transakcije: Transakcija[] = [];

  private get transakcija(): Transakcija[] {
    return this._transakcije;
  }

  transakcije: Transakcija[] = [
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
    return this.http.post<{ name: string }>(
      'https://my-digital-wallet-7752b-default-rtdb.europe-west1.firebasedatabase.app/transakcije.json',
      {
        naslov,
        podnaslov,
        kategorija,
        iznos,
      }
    );
  }

  vratiSveTransakcije() {
    return this.http
      .get<{ [key: string]: Transakcija }>(
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
        })
      );
  }

  vratiTransakciju(id: string) {
    return this.transakcije.find((t) => t.id === id);
  }
}
