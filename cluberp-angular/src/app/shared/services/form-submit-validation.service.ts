import {Injectable} from '@angular/core';
import {ValidationService} from './validation.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitValidationService {

  constructor() {
  }

  unMarkAllFormControls(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormControl) {
        // is a FormControl
        form.get(key).markAsTouched();

      }
      if (control instanceof FormArray) {
        // is a FormArray
        for (const arr of control.controls) {
          const arrForm = arr as FormGroup;
          Object.keys(arrForm.controls).forEach(nestedKey => {


              const nestedControl = arrForm.get(nestedKey);

              if (nestedControl instanceof FormControl) {
                // is a FormControl

                arrForm.get(nestedKey).markAsTouched();

              }
              if (nestedControl instanceof FormArray) {

                // is a FormArray
                for (const nestedArr of nestedControl.controls) {
                  const nestedForm = nestedArr as FormGroup;
                  Object.keys(nestedForm.controls).forEach(doubleNestedKey => {
                    nestedForm.get(doubleNestedKey).markAsTouched();

                  });
                }
              }
            }
          );
        }

      }
      if (control instanceof FormGroup) {
        // is a FormGroup
      }

    });
  }

  consoleLogErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {

      const controlErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}

