import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IstraziPageRoutingModule } from './istrazi-routing.module';

import { IstraziPage } from './istrazi.page';
import { TransakcijaElementComponent } from '../transakcija-element/transakcija-element.component';
import { TransakcijaModalComponent } from '../transakcija-modal/transakcija-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IstraziPageRoutingModule],
  declarations: [
    IstraziPage,
    TransakcijaElementComponent,
    TransakcijaModalComponent,
  ],
  entryComponents: [TransakcijaModalComponent],
})
export class IstraziPageModule {}
