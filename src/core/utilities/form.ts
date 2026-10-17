import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { IRange } from "../interfaces/ml/irange";

export const getFormArray = (form: FormGroup, formArrayName: string): FormArray<any> => {
  if (form.contains(formArrayName)) {
    const abstractControl = form.get(formArrayName);

    if (abstractControl instanceof FormArray) {
      return abstractControl;
    }
  }
  return new FormArray<any>([]);
},

getFormControl = (form: FormGroup, formControlName: string): FormControl | null => {
  if (form.contains(formControlName)) {
    const abstractControl = form.get(formControlName);

    if (abstractControl instanceof FormControl) {
      return abstractControl;
    }
  }
  return null;
},

getFormGroup = (form: FormGroup, formGroupName: string): FormGroup | null => {
  if (form.contains(formGroupName)) {
    const abstractControl = form.get(formGroupName);

    if (abstractControl instanceof FormGroup) {
      return abstractControl;
    }
  }
  return null;
},

getFormControlFromFormArray = (formArray: FormArray, formGroupIndex: number): FormControl | null => {
  if (formArray.length > formGroupIndex) {
    const abstractControl = formArray.at(formGroupIndex);

    if (abstractControl instanceof FormControl) {
      return abstractControl;
    }
  }
  return null;
},

getFormGroupFromFormArray = (formArray: FormArray, formGroupIndex: number): FormGroup | null => {
  if (formArray.length > formGroupIndex) {
    const abstractControl = formArray.at(formGroupIndex);

    if (abstractControl instanceof FormGroup) {
      return abstractControl;
    }
  }
  return null;
},

getRangesFromFormArray = (rangesForms: FormArray, dimension: number) => {
  const ranges: IRange[] = [];

  for (let i = 0; i < dimension; i++) {
    const formGroup = getFormGroupFromFormArray(rangesForms, i);

    if (formGroup !== null && formGroup instanceof FormGroup) {
      const min = getFormControl(formGroup, 'min');
      const max = getFormControl(formGroup, 'max');

      if (min !== null && max !== null) {
        ranges.push({
          min: min.value,
          max: max.value
        });
      }
    }
  }

  return [...ranges];
},

isFormArray = (abstractControl: AbstractControl): boolean => abstractControl instanceof FormArray,

isFormControl = (abstractControl: AbstractControl): boolean => abstractControl instanceof FormControl,

isFormGroup = (abstractControl: AbstractControl): boolean => abstractControl instanceof FormGroup;
