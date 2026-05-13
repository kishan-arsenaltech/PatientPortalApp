import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.authRoutes)
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.dashboardRoutes)
      },
      {
        path: 'inbox',
        loadChildren: () =>
          import('./features/inbox/inbox.routes')
            .then(m => m.inboxRoutes)
      },
      {
        path: 'adherence',
        loadChildren: () =>
          import('./features/adherence/adherence.routes')
            .then(m => m.adherenceRoutes)
      },
      {
        path: 'audit-queue',
        loadChildren: () =>
          import('./features/audit-queue/audit-queue.routes')
            .then(m => m.auditQueueRoutes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];