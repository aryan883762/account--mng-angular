import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
export const routes: Routes = [
  { path: '', children: [
  
    { path: '', pathMatch: 'full',redirectTo: 'account' },

    { path: 'account', loadChildren: '../account/account.module#AccountModule' },

    { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule',
      canLoad: [AuthGuard],
      canActivate: [AuthGuard] },

    { path: 'admin', loadChildren: () => import(`../admin/admin.module`).then(m => m.AdminModule) },

    { path: 'home', pathMatch: 'full', loadChildren: '../home/home.module#HomeModule' },

    { path: 'maintenance', loadChildren: '../maintenance/maintenance.module#MaintenanceModule' },

    { path: '**', loadChildren: '../404/not-found.module#NotFoundModule' }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
