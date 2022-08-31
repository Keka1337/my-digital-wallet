import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  openAlert(event) {
    // event.stopPropagation();
    // event.preventDefault();
    this.alertCtrl
      .create({
        header: 'Dodavanje transakcije u podsetnik',
        message:
          'Da li ste sigurni da zelite da dodate transakciju u podsetnik?',
        buttons: [
          {
            text: 'Da, siguran sam!',
            handler: () => {
              console.log('DO IT! Save it!');
            },
          },
          {
            text: 'Ne, ne želim!',
            role: 'cancel',
            handler: () => {
              console.log('DO NOT save it!');
            },
          },
        ],
      })
      .then((alert: HTMLIonAlertElement) => {
        alert.present();
      });
  }
}
