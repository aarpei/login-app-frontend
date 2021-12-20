import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

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

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(
    password.trim(),
    environment.encoder.password.trim(),
  ).toString();
};

export const decryptPassword = (password: string): string => {
  return CryptoJS.AES.decrypt(
    password.trim(),
    environment.encoder.password.trim(),
  ).toString(CryptoJS.enc.Utf8);
};
