import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateCustomName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null; // deixa o required tratar vazio

    const trimmed = value.trim();

    // Regra 1: apenas letras, espaços e hífens simples
    const validChars = /^[a-zA-ZÀ-ÿ\s-]+$/.test(trimmed);
    if (!validChars) {
      return { invalidCharacters: true };
    }

    // Regra 2: sem espaços duplos
    if (/\s{2,}/.test(trimmed)) {
      return { doubleSpaces: true };
    }

    // Regra 3: sem hífens duplos
    if (/--/.test(trimmed)) {
      return { doubleHyphen: true };
    }

    // Regra 4: não começar ou terminar com hífen
    if (/^-|-$/.test(trimmed)) {
      return { hyphenPosition: true };
    }

    return null;
  };
}