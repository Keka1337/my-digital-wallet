import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.page.html',
  styleUrls: ['./registracija.page.scss'],
})
export class RegistracijaPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('Jelena', Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  registrujSe() {
    this.loadingCtrl
      .create({ message: 'Registraciju u toku...' })
      .then((loadingEl: HTMLIonLoadingElement) => {
        loadingEl.present();
        loadingEl.dismiss();
      });
    console.log(this.registerForm);
    this.authService
      .registrujSe(this.registerForm.value)
      .subscribe((resData) => {
        console.log('Uspesno registrovanje!');
        console.log(resData);
      });
  }
}
