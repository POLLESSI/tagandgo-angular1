import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { AvatarComponent } from './components/dashboard/avatar/avatar.component';
import { BonusComponent } from './components/dashboard/bonus/bonus.component';
//import { ChatActivityComponent } from './components/chatactivity/chatactivity.component';   
//import { ChatEvenementComponent } from './components/chatevenement/chatevenement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/dashboard/map/map.component';
import { MediaitemComponent } from './components/dashboard/mediaitem/mediaitem.component';
import { NevenementComponent } from './components/dashboard/nevenement/nevenement.component';
import { NiconComponent } from './components/dashboard/nicon/nicon.component';    
import { NpersonComponent } from './components/dashboard/nperson/nperson.component';
import { NuserComponent } from './components/dashboard/nuser/nuser.component';
import { NvoteComponent } from './components/dashboard/nvote/nvote.component';
import { RecompenseComponent } from './components/dashboard/recompense/recompense.component';
import { OrganisateurComponent } from './components/dashboard/organisateur/organisateur.component';
import { WeatherforecastComponent } from './components/dashboard/weatherforecast/weatherforecast.component';
import { RoutesDefined } from './constants/routes'; 

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: RoutesDefined.DASHBOARD, component: DashboardComponent, children: [
        { path: RoutesDefined.ACTIVITY, component: ActivityComponent},
        { path: RoutesDefined.AVATAR, component: AvatarComponent},
        { path: RoutesDefined.BONUS, component: BonusComponent},
        //{ path: RoutesDefined.CHATACTIVITY, component: ChatActivityComponent},
        //{ path: RoutesDefined.CHATEVENEMENT, component: ChatEvenementComponent},
        { path: RoutesDefined.MAP, component: MapComponent},
        { path: RoutesDefined.MEDIAITEM, component: MediaitemComponent},
        { path: RoutesDefined.NEVENEMENT, component: NevenementComponent},
        { path: RoutesDefined.NICON, component: NiconComponent},
        { path: RoutesDefined.NPERSON, component: NpersonComponent},
        { path: RoutesDefined.NUSER, component: NuserComponent},
        { path: RoutesDefined.NVOTE, component: NvoteComponent},
        { path: RoutesDefined.RECOMPENSE, component: RecompenseComponent},
        { path: RoutesDefined.ORGANISATEUR, component: OrganisateurComponent},
        { path: RoutesDefined.WEATHERFORECAST, component: WeatherforecastComponent},
        { path: '**', redirectTo: '' }
    ]},
    { path: '**', redirectTo: `/${RoutesDefined.DASHBOARD}`} // Redirection pour les routes non trouvées
];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
