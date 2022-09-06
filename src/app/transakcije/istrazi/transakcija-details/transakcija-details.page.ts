import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transakcija } from '../../transakcija.model';
import { TransakcijeService } from '../../transakcije.service';

@Component({
  selector: 'app-transakcija-details',
  templateUrl: './transakcija-details.page.html',
  styleUrls: ['./transakcija-details.page.scss'],
})
export class TransakcijaDetailsPage implements OnInit {
  transakcija: Transakcija = {
    id: '1',
    naslov: 'Plata',
    podnaslov: 'Mesec jun',
    kategorija: 'Priliv',
    tipId: 'xx',
    iznos: 100,
    userId: 'xx',
  };
  constructor(
    private route: ActivatedRoute,
    private transService: TransakcijeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.transakcija = this.transService.vratiTransakciju(
        paramMap.get('transakcijaID')
      );
    });
  }
}
