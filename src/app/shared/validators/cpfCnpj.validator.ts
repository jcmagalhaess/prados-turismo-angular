import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that checks if the given value is a valid CPF or CNPJ number.
 *
 * If the given value is a string with a length of 11 or less, it is considered a CPF number and
 * validated as such. If the given value is a string with a length of more than 11, it is considered
 * a CNPJ number and validated as such.
 *
 * Returns null if the given value is valid, or an object with the key 'valid' and value false if the
 * given value is invalid.
 */
export function cpfCnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let valid;

    if (control.value && control.value.length <= 11) {
      valid = isCPF(control.value);
      return valid ? null : { valid: !valid };
    }

    if (control.value && control.value.length > 11) {
      valid = isCNPJ(control.value);
      return valid ? null : { valid: !valid };
    }

    return null;
  };
}

/**
 * Checks if the given CPF number is valid.
 *
 * @param cpf - String with the CPF number to be checked.
 * @returns - Boolean indicating if the CPF is valid or not.
 */
export function isCPF(cpf: string): boolean {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  // eliminates known invalid CPFs
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false;
  // validate the first digit
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  // validate the second digit
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

/**
 * Checks if the given CNPJ number is valid.
 *
 * @param cnpj - String with the CNPJ number to be checked.
 * @returns - Boolean indicating if the CNPJ is valid or not.
 */
export function isCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj == '') return false;
  if (cnpj.length != 14) return false;
  // eliminates known invalid CNPJs
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;
  // validate the first digit
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(0))) return false;
  // validate the second digit
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(1))) return false;
  return true;
}
