import { TestBed } from '@angular/core/testing';
import { RegisterFormDataService } from './register-form-data.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('RegisterFormDataService', () => {
  let service: RegisterFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormDataService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentFormGroupRegisterProfile', () => {
    it('deve retornar um FormGroup com os controles esperados', () => {
      const form = service.getCurrentFormGroupRegisterProfile;

      expect(form instanceof FormGroup).toBe(true);
      expect(form.contains('registerNameForm')).toBe(true);
      expect(form.contains('registerEmailForm')).toBe(true);
    });

    it('deve validar registerNameForm corretamente', () => {
      const form = service.getCurrentFormGroupRegisterProfile;
      const nameControl = form.get('registerNameForm');

      // Campo obrigatório
      nameControl?.setValue(null);
      expect(nameControl?.valid).toBe(false);

      // Muito curto
      nameControl?.setValue('ab');
      expect(nameControl?.valid).toBe(false);

      // Muito longo
      nameControl?.setValue('a'.repeat(101));
      expect(nameControl?.valid).toBe(false);

      // Nome válido (desde que o validador personalizado aceite)
      nameControl?.setValue('João-Silva');
      expect(nameControl?.valid).toBe(true); // assumindo que o validador aceita hífen
    });

    it('deve validar registerEmailForm corretamente', () => {
      const form = service.getCurrentFormGroupRegisterProfile;
      const emailControl = form.get('registerEmailForm');

      emailControl?.setValue(null);
      expect(emailControl?.valid).toBe(false);

      emailControl?.setValue('emailinvalido');
      expect(emailControl?.valid).toBe(false);

      emailControl?.setValue('teste@teste.com');
      expect(emailControl?.valid).toBe(true); // assumindo que o strictEmailValidator aceita
    });
  });

  describe('checkIfUsernameIsStandardized', () => {
    let validatorFn: ReturnType<RegisterFormDataService['checkIfUsernameIsStandardized']>;

    beforeEach(() => {
      validatorFn = service.checkIfUsernameIsStandardized();
    });

    it('deve retornar erro se houver caracteres especiais', () => {
      const control = new FormControl('user@name');
      expect(validatorFn(control)).toEqual({ validate: true });
    });

    it('deve retornar erro se hífen estiver no início, fim ou duplicado', () => {
      const invalids = ['-username', 'username-', 'user--name'];
      for (const name of invalids) {
        const control = new FormControl(name);
        expect(validatorFn(control)).toEqual({ validate: true });
      }
    });

    it('deve retornar null se o nome estiver padronizado', () => {
      const control = new FormControl('username-valid');
      expect(validatorFn(control)).toBeNull();
    });
  });
});
