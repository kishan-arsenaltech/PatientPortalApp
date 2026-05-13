import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const digits = (control.value as string).replace(/\D/g, '');
    return digits.length === 10 ? null : { phone: { message: 'Phone number must be 10 digits.' } };
  };
}

export function npiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const digits = (control.value as string).replace(/\D/g, '');
    return digits.length === 10 ? null : { npi: { message: 'NPI must be exactly 10 digits.' } };
  };
}

export function dobValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const val = (control.value as string).replace(/\s/g, '');
    const parts = val.split('/');
    if (parts.length !== 3 || parts.some(p => !p)) {
      return { dob: { message: 'Enter a valid date MM/DD/YYYY.' } };
    }
    const [mm, dd, yyyy] = parts.map(Number);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900 || yyyy > new Date().getFullYear()) {
      return { dob: { message: 'Enter a valid date MM/DD/YYYY.' } };
    }
    return null;
  };
}
