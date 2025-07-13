import { FormControl } from '@angular/forms';
import { validateCustomName } from './name-format.validator';

describe('validateCustomName', () => {
  const validator = validateCustomName();

  it('deve retornar null para valor válido', () => {
    const control = new FormControl('João da Silva');
    expect(validator(control)).toBeNull();
  });

  it('deve retornar null se o valor for vazio (let required lidar)', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('deve retornar { invalidCharacters: true } se contiver números', () => {
    const control = new FormControl('João123');
    expect(validator(control)).toEqual({ invalidCharacters: true });
  });

  it('deve retornar { invalidCharacters: true } se contiver símbolos especiais', () => {
    const control = new FormControl('Maria@Silva!');
    expect(validator(control)).toEqual({ invalidCharacters: true });
  });

  it('deve retornar { doubleSpaces: true } se houver dois espaços consecutivos', () => {
    const control = new FormControl('Ana  Clara');
    expect(validator(control)).toEqual({ doubleSpaces: true });
  });

  it('deve retornar { doubleHyphen: true } se houver dois hífens consecutivos', () => {
    const control = new FormControl('Ana--Clara');
    expect(validator(control)).toEqual({ doubleHyphen: true });
  });

  it('deve retornar { hyphenPosition: true } se começar com hífen', () => {
    const control = new FormControl('-Joana');
    expect(validator(control)).toEqual({ hyphenPosition: true });
  });

  it('deve retornar { hyphenPosition: true } se terminar com hífen', () => {
    const control = new FormControl('Joana-');
    expect(validator(control)).toEqual({ hyphenPosition: true });
  });

  it('deve retornar null com letras acentuadas e hífens válidos', () => {
    const control = new FormControl('Érica Lopes-Silva');
    expect(validator(control)).toBeNull();
  });

  it('deve ignorar espaços antes/depois do nome (trim)', () => {
    const control = new FormControl('  João da Silva  ');
    expect(validator(control)).toBeNull();
  });
});
