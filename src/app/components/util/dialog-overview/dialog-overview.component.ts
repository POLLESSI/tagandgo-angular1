import { Component, inject, model } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SignUpFormComponent } from '../../login/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from '../../login/sign-in-form/sign-in-form.component';


export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.scss'
})
export class DialogOverviewComponent {
  readonly dialogRef = inject(MatDialogRef<SignUpFormComponent, SignInFormComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.text);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
