import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BonusComponent } from './components/bonus/bonus.component';
// import { ChatActivityComponent } from './components/chatactivity/chatactivity.component';   
//import { ChatEvenementComponent } from './components/chatevenement/chatevenement.component';
import { MapComponent } from './components/map/map.component';
import { MediaitemComponent } from './components/mediaitem/mediaitem.component';
import { NevenementComponent } from './components/nevenement/nevenement.component';
import { NiconComponent } from './components/nicon/nicon.component';    
import { NpersonComponent } from './components/nperson/nperson.component';
import { NuserComponent } from './components/nuser/nuser.component';
import { NvoteComponent } from './components/nvote/nvote.component';
import { RecompenseComponent } from './components/recompense/recompense.component';
import { OrganisateurComponent } from './components/organisateur/organisateur.component';
import { WeatherforecastComponent } from './components/weatherforecast/weatherforecast.component';

const routes: Routes = [
    { path: 'activity', component: ActivityComponent},
    { path: 'avatar', component: AvatarComponent},
    { path: 'bonus', component: BonusComponent},
    // { path: 'chatactivity', component: ChatActivityComponent},
    // { path: 'chatevenement', component: ChatEvenementComponent},
    { path: 'map', component: MapComponent},
    { path: 'mediaitem', component: MediaitemComponent},
    { path: 'nevenement', component: NevenementComponent},
    { path: 'nicon', component: NiconComponent},
    { path: 'nperson', component: NpersonComponent},
    { path: 'nuser', component: NuserComponent},
    { path: 'nvote', component: NvoteComponent},
    { path: 'recompense', component: RecompenseComponent},
    { path: 'organisateur', component: OrganisateurComponent},
    { path: 'weatherforecast', component: WeatherforecastComponent},
    { path: '**', redirectTo: '' }
]

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
