import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransakcijaDetailsPageRoutingModule } from './transakcija-details-routing.module';

import { TransakcijaDetailsPage } from './transakcija-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransakcijaDetailsPageRoutingModule
  ],
  declarations: [TransakcijaDetailsPage]
})
export class TransakcijaDetailsPageModule {}
