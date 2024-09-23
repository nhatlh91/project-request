import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogClose} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import { UserListComponent } from './components/user-list/user-list.component';
import { OffRequestListComponent } from './components/off-request-list/off-request-list.component';
import { OffRequestDetailComponent } from './components/off-request-detail/off-request-detail.component';
import { OffRequestCreateComponent } from './components/off-request-create/off-request-create.component';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    OffRequestListComponent,
    OffRequestDetailComponent,
    OffRequestCreateComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatPaginatorModule,
    MatSortModule,
    MatHeaderRow,
    MatRow,
    MatFormField,
    MatInput,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    ReactiveFormsModule,
    MatDialogClose,
    MatLabel,
    MatSelect,
    MatOption,
    MatMiniFabButton,
    MatPaginator,
  ]
})
export class MainModule { }
