import { Routes } from '@angular/router';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/AuthGuard';
import { ForbiddenComponent } from './components/dashboard/forbidden/forbidden.component';
import { AdminGuard } from './guards/AdminGuard';
import { RoutesDefined } from './constants/routes';
import { WelcomeComponent } from './components/dashboard/welcome/welcome.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: RoutesDefined.LOGIN, component: LoginComponent },
  {
    path: RoutesDefined.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: RoutesDefined.FORBIDDEN, component: ForbiddenComponent },
      { path: RoutesDefined.ACTIVITY, component: ActivityComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: RoutesDefined.WELCOME, component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: RoutesDefined.PROFILE, component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  }
];
