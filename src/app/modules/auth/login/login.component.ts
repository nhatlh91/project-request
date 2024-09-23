import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  rf!: FormGroup;
  AVT_URL = environment.avtUrl;
  isLoading = false;

  constructor(private authService: AuthService) {
    this.rf = new FormGroup({
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    );
  }

  onSubmit() {
    this.isLoading = !this.isLoading;
    this.authService.login(this.rf.value);
    this.isLoading = !this.isLoading;
  }

}
