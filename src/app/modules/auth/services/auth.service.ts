import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';
import Swal from "sweetalert2";
import {User} from "../../main/services/user.service";

const SECRET_KEY = environment.secretKey;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afs: AngularFirestore,
              public router: Router,
              private snackBar: MatSnackBar,
              private tokenStorageService: TokenStorageService) {
  }

  getUser(phone: string) {
    return this.afs.collection('users', ref => ref.where('phone', '==', phone)).valueChanges({idField: 'uid'}) as unknown as Observable<User[]>;
  }

  login(authRequest: AuthRequest) {
    this.getUser(authRequest.phone).subscribe({
      next: value => {
        if (value.length === 0) {
          Swal.fire({
            text: "Thông tin đăng nhập không chính xác",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          const decryptedPassword = CryptoJS.AES.decrypt(value[0].password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
          if (decryptedPassword !== authRequest.password) {
            Swal.fire({
              text: "Thông tin đăng nhập không chính xác",
              icon: "error",
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              title: `Xin chào ${value[0].fullName}`,
              text: "Đăng nhập thành công",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
            this.tokenStorageService.saveUserToLocalStorage(value[0]);
            this.router.navigate(['main/off-request-list']);
          }
        }
      }
    });
  }

  get isAuth(): boolean {
    const user = this.tokenStorageService.getUserFromLocalStorage();
    return (user !== undefined);
  }

  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '×', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }
}

export interface AuthRequest {
  phone: string;
  password: string;
}
