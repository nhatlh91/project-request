import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {User, UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  user!: User;
  itemUid: string[] = [];
  username = window.localStorage.getItem('username') || "";
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullName'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: value => {
        this.dataSource.data = value;
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  breakStringToArray(string: string) {
    return string.split(' | ').sort();
  }
}
