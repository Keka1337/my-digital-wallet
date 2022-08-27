import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransakcijePageRoutingModule } from './transakcije-routing.module';

import { TransakcijePage } from './transakcije.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransakcijePageRoutingModule
  ],
  declarations: [TransakcijePage]
})
export class TransakcijePageModule {}
