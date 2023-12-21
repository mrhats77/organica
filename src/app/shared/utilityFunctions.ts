import { AbstractControl } from "@angular/forms";
import { IProduct } from "../core/models/product";

export function getFormControlErrors(control: AbstractControl): boolean {
    return (control.touched || control.dirty) && !control.valid;
  }



 