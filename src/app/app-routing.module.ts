import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)},
  {path: 'main', loadChildren: () => import('./modules/main/main.module').then(module => module.MainModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
