import {Component} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../auth/services/auth.service";
import {TokenStorageService} from "../../../auth/services/token-storage.service";
import {User} from "../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  AVT_URL = environment.avtUrl;
  user: User | undefined;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService) {
    const user = this.tokenStorageService.getUserFromLocalStorage();
    if(user != undefined) {
      this.user = user;
    } else {
      Swal.fire({
        text: "Vui lòng đăng nhập lại",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
      this.authService.signOut();
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
