import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { TransakcijaModalComponent } from '../transakcija-modal/transakcija-modal.component';
import { Transakcija } from '../transakcija.model';
import { TransakcijeService } from '../transakcije.service';

@Component({
  selector: 'app-istrazi',
  templateUrl: './istrazi.page.html',
  styleUrls: ['./istrazi.page.scss'],
})
export class IstraziPage implements OnInit {
  transakcije: Transakcija[];

  constructor(
    private transService: TransakcijeService,
    private modalCtrl: ModalController
  ) {
    this.transakcije = this.transService.transakcije;
  }

  ngOnInit() {
    this.transService.vratiSveTransakcije().subscribe((transakcijaPodaci) => {
      console.log(transakcijaPodaci);
      let transakcijePomocni: Transakcija[];
      for (const key in transakcijaPodaci) {
        transakcijePomocni.push({
          id: key,
          naslov: transakcijaPodaci[key].naslov,
          podnaslov: transakcijaPodaci[key].podnaslov,
          kategorija: transakcijaPodaci[key].kategorija,
          iznos: transakcijaPodaci[key].iznos,
        });
      }
      if (transakcijePomocni == null) {
        console.log('Vasa istorija transakcija je trenutno prazna!');
      } else {
        this.transakcije = transakcijePomocni;
      }
    });
  }

  openModal() {
    this.modalCtrl
      .create({
        component: TransakcijaModalComponent,
        componentProps: { naslovStranice: 'Dodaj transakciju' },
      })
      .then((modal: HTMLIonModalElement) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData: OverlayEventDetail<any>) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);
          this.transService
            .dodaj(
              resultData.data.naslov,
              resultData.data.podnaslov,
              resultData.data.kategorija,
              resultData.data.iznos
            )
            .subscribe((res) => {
              console.log(res);
            });
        }
      });
  }
}