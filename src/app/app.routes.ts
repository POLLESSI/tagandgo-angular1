import { Routes } from '@angular/router';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { AvatarComponent } from './components/dashboard/avatar/avatar.component';
import { BonusComponent } from './components/dashboard/bonus/bonus.component';
import { MapComponent } from './components/dashboard/map/map.component';
import { MediaitemComponent } from './components/dashboard/mediaitem/mediaitem.component';
import { NevenementComponent } from './components/dashboard/nevenement/nevenement.component';
import { NiconComponent } from './components/dashboard/nicon/nicon.component';
import { NpersonComponent } from './components/dashboard/nperson/nperson.component';
import { NuserComponent } from './components/dashboard/nuser/nuser.component';
import { NvoteComponent } from './components/dashboard/nvote/nvote.component';
import { OrganisateurComponent } from './components/dashboard/organisateur/organisateur.component';
import { RecompenseComponent } from './components/dashboard/recompense/recompense.component';
// import { WeatherforecastComponent } from './components/dashboard/weatherforecast/weatherforecast.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { AuthGard } from './guards/AuthGuard';
import { ForbiddenComponent } from './components/dashboard/forbidden/forbidden.components';
import { AdminGuard } from './guards/AdminGuard';
import { RoutesDefined } from './constants/routes';
import { WelcomeComponent } from './components/dashboard/welcome/welcome.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent },
    { path: RoutesDefined.LOGIN, component: LoginComponent},
    {
        path: RoutesDefined.DASHBOARD, 
        component: DashboardComponent,
        canActivate: [AuthGard],
        children: [
            { path: RoutesDefined.FORBIDDEN,component: ForbiddenComponent },
            { path: RoutesDefined.ACTIVITY, component: ActivityComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.AVATAR, component: AvatarComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.BONUS, component: BonusComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.MAP, component: MapComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.MEDIAITEM, component: MediaitemComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.NEVENEMENT, component: NevenementComponent, canActivate: [AuthGard] },
            { path: RoutesDefined.NICON, component: NiconComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.NPERSON, component: NpersonComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.NUSER, component: NuserComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.NVOTE, component: NvoteComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.ORGANISATEUR, component: OrganisateurComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.RECOMPENSE, component: RecompenseComponent, canActivate: [AuthGard]},
            // { path: RoutesDefined.WEATHERFORECAST, component: WeatherforecastComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.WELCOME, component: WelcomeComponent, canActivate: [AuthGard]},
            { path: RoutesDefined.PROFILE, component: ProfileComponent, canActivate: [AuthGard]},

        ]
    }
];

export { RoutesDefined };