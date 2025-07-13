import { FormControl } from '@angular/forms';
import { strictEmailValidator } from './strict-email.validator';

describe('strictEmailValidator', () => {
  const validator = strictEmailValidator();

  it('deve retornar null se o valor for vazio (deixa required tratar)', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('deve retornar null para um e-mail válido simples', () => {
    const control = new FormControl('usuario@dominio.com');
    expect(validator(control)).toBeNull();
  });

  it('deve retornar null para e-mail com subdomínio', () => {
    const control = new FormControl('usuario@dominio.com.br');
    expect(validator(control)).toBeNull();
  });

  it('deve retornar erro se o e-mail começar com número', () => {
    const control = new FormControl('1usuario@dominio.com');
    expect(validator(control)).toEqual({ invalidEmailStrict: true });
  });

  it('deve retornar erro se o e-mail estiver sem "@"', () => {
    const control = new FormControl('usuariodominio.com');
    expect(validator(control)).toEqual({ invalidEmailStrict: true });
  });

  it('deve retornar erro se estiver sem domínio', () => {
    const control = new FormControl('usuario@.com');
    expect(validator(control)).toEqual({ invalidEmailStrict: true });
  });

  it('deve retornar erro se o e-mail terminar com ponto', () => {
    const control = new FormControl('usuario@dominio.com.');
    expect(validator(control)).toEqual({ invalidEmailStrict: true });
  });

  it('deve retornar erro se o domínio tiver menos de 2 caracteres', () => {
    const control = new FormControl('usuario@d.co');
    expect(validator(control)).toEqual({ invalidEmailStrict: true });
  });

  it('deve retornar null para e-mails com pontos, hífens e underscores no nome', () => {
    const control = new FormControl('usuario.nome-test_123@dominio.com');
    expect(validator(control)).toBeNull();
  });
});
