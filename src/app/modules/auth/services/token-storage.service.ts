import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import * as CryptoJS from 'crypto-js';
import {User} from "../../main/services/user.service";

const USER_KEY = 'user';
const SECRET_KEY = environment.secretKey;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveUserToLocalStorage(user: User) {
    user.password = 'censored';
    window.localStorage.removeItem(USER_KEY);
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();
    window.localStorage.setItem(USER_KEY, encryptedUser);
  }

  public getUserFromLocalStorage(): User | undefined {
    const encryptedUser = window.localStorage.getItem(USER_KEY);
    try {
      if (encryptedUser !== null) {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));  // Chuyển chuỗi thành Json
      } else return undefined;
    } catch (error) {
      console.error('Error decrypting user data:', error);
      return undefined;
    }
  }
}
