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
  ];
  constructor() {}

  vratiTransakciju(id: string) {
    return this.transakcije.find((t) => t.id === id);
  }
}
