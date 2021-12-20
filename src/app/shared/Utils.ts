import { FormGroup } from '@angular/forms';
export const resetFrom = (formGroup: FormGroup) => {
  formGroup.reset();

  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key)?.setErrors(null);
  });
};

export const recoverAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};
export const saveAccessToken = (accessToken: string): void => {
  sessionStorage.setItem('accessToken', accessToken);
};
export const removeAccessToken = (): void => {
  sessionStorage.removeItem('accessToken');
};
