import { Component, OnInit } from '@angular/core';
import { Transakcija } from '../transakcija.model';
import { TransakcijeService } from '../transakcije.service';

@Component({
  selector: 'app-istrazi',
  templateUrl: './istrazi.page.html',
  styleUrls: ['./istrazi.page.scss'],
})
export class IstraziPage implements OnInit {
  transakcije: Transakcija[];

  constructor(private transService: TransakcijeService) {
    this.transakcije = this.transService.transakcije;
  }

  ngOnInit() {}
}
