import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogIn(form: NgForm) {
    if (form.valid) {
      this.authService.logIn(form.value).subscribe((resData) => {
        console.log('Uspesna prijava!');
        console.log(resData);
        this.router.navigateByUrl('/transakcije');
      });
    }
  }

  // logIn(logInForm: NgForm) {
  //   if (logInForm.valid) {
  //     this.loadingCtrl
  //       .create({ message: 'Prijava u toku...' })
  //       .then((loadingEl: HTMLIonLoadingElement) => {
  //         loadingEl.present();
  //         this.authService.logIn(logInForm.value).subscribe(
  //           (resData) => {
  //             console.log('prijava uspesna');
  //             console.log(resData);
  //             loadingEl.dismiss();
  //             this.router.navigateByUrl('/home');
  //           },
  //           (errRes) => {
  //             console.log(errRes);
  //             loadingEl.dismiss();
  //             this.alertCtrl.create({
  //               header: 'Neuspešna prijava!',
  //               message: 'Neispravan email ili lozinka.',
  //               buttons: ['Pokušajte povono.'],
  //             }).then((alert: HTMLIonAlertElement) => {
  //               alert.present();
  //             });
  //             logInForm.reset();
  //             console.log(errRes);
  //           }
  //         );

  //       });
  //   }
  // }
}
