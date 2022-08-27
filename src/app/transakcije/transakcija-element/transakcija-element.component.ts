import { Component, Input, OnInit } from '@angular/core';
import { Transakcija } from '../transakcija.model';

@Component({
  selector: 'app-transakcija-element',
  templateUrl: './transakcija-element.component.html',
  styleUrls: ['./transakcija-element.component.scss'],
})
export class TransakcijaElementComponent implements OnInit {
  @Input() transakcija: Transakcija = {
    id: '2',
    naslov: 'Plata',
    podnaslov: 'Jul',
    kategorija: 'Priliv',
    iznos: 200,
  };

  constructor() {}

  ngOnInit() {}
}
