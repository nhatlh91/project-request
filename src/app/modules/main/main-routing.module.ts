import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {OffRequestListComponent} from "./components/off-request-list/off-request-list.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'off-request-list',
        component: OffRequestListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatIcon, MatIconButton, MatTooltip],
  declarations: [
    SidebarComponent
  ],
  exports: [RouterModule, SidebarComponent]
})
export class MainRoutingModule {
}
