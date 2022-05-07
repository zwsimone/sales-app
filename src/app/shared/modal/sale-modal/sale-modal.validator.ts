import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class SaleValidator {
    tableFieldRequiredValidator(saleType: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (saleType === 'table') {
                return control.value === '' ? { required: true } : null;
            } else {
                return null;
            }
        };
    }

    deliveryFieldRequiredValidator(saleType: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (saleType === 'delivery') {
                return control.value === '' ? { required: true } : null;
            } else {
                return null;
            }
        };
    }
}