import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.page.html',
  styleUrls: ['./registracija.page.scss'],
})
export class RegistracijaPage implements OnInit {
  registerForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      ime: new FormControl('Jelena', Validators.required),
      prezime: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      lozinka: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  registrujSe() {
    console.log(this.registerForm);
  }
}
