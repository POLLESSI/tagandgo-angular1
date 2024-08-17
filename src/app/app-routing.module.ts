import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: AvatarComponent
    }
]

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
