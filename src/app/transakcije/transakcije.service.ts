import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transakcija } from './transakcija.model';

@Injectable({
  providedIn: 'root',
})
export class TransakcijeService {
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
    return this.http.get<{ [key: string]: Transakcija }>(
      'https://my-digital-wallet-7752b-default-rtdb.europe-west1.firebasedatabase.app/transakcije.json'
    );
  }

  vratiTransakciju(id: string) {
    return this.transakcije.find((t) => t.id === id);
  }
}
