import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

/**
 * Reset errors and content from all controls of a FormGroup
 * @param {FormGroup} formGroup
 */
export const resetFrom = (formGroup: FormGroup) => {
  formGroup.reset();

  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key)?.setErrors(null);
  });
};

/**
 * Recover accessToken from sessionStorage
 * @return {string} accessToken from sessionStorage if exists
 */
export const recoverAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

/**
 * Save accessToken in sessionStorage
 * @param {string} accessToken
 */
export const saveAccessToken = (accessToken: string): void => {
  sessionStorage.setItem('accessToken', accessToken);
};

/**
 * Remove accessToken from sessionStorage
 */
export const removeAccessToken = (): void => {
  sessionStorage.removeItem('accessToken');
};

/**
 * Encrypt an string
 * @param {string} password String to encrypt
 * @return {string} String encrypted
 */
export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(
    password.trim(),
    environment.encoder.password.trim(),
  ).toString();
};

/**
 * Decrypt an string
 * @param {string} password String to decrypted
 * @return {string} String decrypted
 */
export const decryptPassword = (password: string): string => {
  return CryptoJS.AES.decrypt(
    password.trim(),
    environment.encoder.password.trim(),
  ).toString(CryptoJS.enc.Utf8);
};
