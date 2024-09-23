import {Component, ViewChild} from '@angular/core';
import {OffRequestDetailComponent} from "../off-request-detail/off-request-detail.component";
import {OffRequest, OffRequestService} from "../../services/off-request.service";
import {OffRequestCreateComponent} from "../off-request-create/off-request-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {User, UserService} from "../../services/user.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../auth/services/token-storage.service";

@Component({
  selector: 'app-off-request-list',
  templateUrl: './off-request-list.component.html',
  styleUrl: './off-request-list.component.css'
})
export class OffRequestListComponent {
  userMap: Map<string, string> = new Map<string, string>();
  status = 'pending';
  currentUser!: User;
  dataSource = new MatTableDataSource<OffRequest>();
  length = 0;
  displayedColumns: string[] = ['created', 'requester', 'begin', 'end', 'hours', 'status', 'pendingApproves', 'action'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private userService: UserService,
              private offRequestService: OffRequestService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
    const user = this.tokenStorageService.getUserFromLocalStorage();
    if (user) {
      this.currentUser = user;
    }
    this.userMap = this.userService.userMap;
  }

  async ngOnInit() {
    await this.getData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  alert(message: string) {
    this.snackBar.open(message, 'x', {
      duration: 2000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  async getData() {
    const data = await this.offRequestService.getOffRequests(this.status);
    if (data) {
      const filteredData = this.currentUser.role === 'MANAGER' ?
        data :
        data.filter(request => (request.requesterId === this.currentUser.uid || request.pendingApproves.split('|')[0] === this.currentUser.uid));
      this.dataSource.data = filteredData;
      this.length = filteredData.length;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reject(item: OffRequest) {
    item.comment = this.currentUser.fullName + ': ' + prompt('Nhập nguyên nhân từ chối:');
    item.status = 'rejected';
    this.offRequestService.updateOffRequest(item);
    this.alert('Đã từ chối');
    this.getData();
  }

  approve(item: OffRequest) {
    console.table(item);
    const pendings = item.pendingApproves.split('|');
    pendings.shift();
    if (pendings.length === 0) {
      item.pendingApproves = '';
      item.status = 'approved';
    }
    item.pendingApproves = pendings.join('|');
    this.offRequestService.updateOffRequest(item);
    this.alert('Phê duyệt thành công');
    this.getData();
  }

  offRequestCreate() {
    const dialogRef = this.dialog.open(OffRequestCreateComponent, {
      width: '100%',
      maxWidth: '1200px',
      data: {
        name: this.currentUser.fullName,
        id: this.currentUser.uid,
        deptId: this.currentUser.deptId,
        dept: this.currentUser.dept,
        role: this.currentUser.role,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: OffRequest | undefined) => {
        if (!result) {
          return;
        }
        this.offRequestService.createOffRequest(result);
        this.alert('Đã tạo yêu cầu');
        this.getData();
      });
  }

  delete(id: string) {
    this.offRequestService.deleteOffRequests(id);
    this.alert('Đã xóa');
    this.getData();
  }

  detail(item: OffRequest) {
    const dialogRef = this.dialog.open(OffRequestDetailComponent, {
      width: '100%',
      maxWidth: '1200px',
      data: item,
    });
    dialogRef
      .afterClosed()
      .subscribe(() => this.getData());
  }

  logout() {
    this.authService.signOut();
  }
}
