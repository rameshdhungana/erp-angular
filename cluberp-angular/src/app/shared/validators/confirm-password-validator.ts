import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    const password = control.get('password1');
    const confirmPassword = control.get('password2');

    return password.value && confirmPassword.value && password.value !== confirmPassword.value ? {'passwordNotMatched': true} : null;
  }
}

// export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   const password = control.get('password1').value;
//   const confirmPassword = control.get('password2').value;
//
//   return password === confirmPassword ? {'identityRevealed': true} : null;
// };
