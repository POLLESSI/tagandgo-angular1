import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';

const routes: Routes = [
    { path: 'activity', component: ActivityComponent},
    { path: '**', redirectTo: '' }
]

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
