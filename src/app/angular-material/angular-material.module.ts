import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
//import { MatErrorModule } from '@angular/material/console.error';

@NgModule({
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        //MatErrorModule
    ]
})
export class AngularMaterialModule {}