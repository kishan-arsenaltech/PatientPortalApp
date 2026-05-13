import { Routes } from '@angular/router';

export const referralsRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/referral-form/referral-form.component')
        .then(m => m.ReferralFormComponent),
    title: 'New Referral · Patient Portal'
  },
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  }
];
