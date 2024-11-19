import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})

export class FormService {
    resetForm<T>(form: NgForm, defaultValues: T): void {
        form.resetForm(defaultValues);
    }
    handleErrors(error: any): void {
        console.error("An error occurred:", error);
        alert('An error occurred. Please try again.');
    }
}