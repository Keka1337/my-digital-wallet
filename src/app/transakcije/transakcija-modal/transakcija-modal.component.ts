import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transakcija-modal',
  templateUrl: './transakcija-modal.component.html',
  styleUrls: ['./transakcija-modal.component.scss'],
})
export class TransakcijaModalComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  @Input() naslovStranice: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  dodajTransakciju() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        transakcijaPodaci: {
          naslov: this.form.value['naslov'],
          podnaslov: this.form.value['podnaslov'],
          kategorija: this.form.value['kategorija'],
          iznos: this.form.value['iznos'],
        },
      },
      'confirm'
    );
  }
}
