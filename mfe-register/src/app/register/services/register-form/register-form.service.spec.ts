import { FormControl, FormGroup } from '@angular/forms';
import { RegisterFormService } from './register-form.service';
import { RegisterFormDataService } from '../register-form-data/register-form-data.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;
  let formDataServiceMock: Partial<RegisterFormDataService>;
  let formGroup: FormGroup;

  beforeEach(() => {
    // Criando o formGroup com o controle esperado
    formGroup = new FormGroup({
      registerEmailForm: new FormControl('')  // controle com nome correto
    });

    // Mock do serviço que retorna esse formGroup
    formDataServiceMock = {
      get getCurrentFormGroupRegisterProfile() {
        return formGroup;
      }
    };

    // Instância do serviço com o mock
    service = new RegisterFormService(formDataServiceMock as RegisterFormDataService);
  });

  it('deve retornar true se o valor do campo for válido', () => {
    formGroup.controls['registerEmailForm'].setValue('teste@teste.com');

    expect(service.validateField()).toBe(true);
  });

  it('deve retornar false se o valor for nulo', () => {
    formGroup.controls['registerEmailForm'].setValue(null);

    expect(service.validateField()).toBe(false);
  });

  it('deve retornar false se o valor for vazio', () => {
    formGroup.controls['registerEmailForm'].setValue('');

    expect(service.validateField()).toBe(false);
  });

  it('deve retornar false se o valor for undefined', () => {
    formGroup.controls['registerEmailForm'].setValue(undefined);

    expect(service.validateField()).toBe(false);
  });

  it('deve retornar false se o valor tiver mais de 100 caracteres', () => {
    const longValue = 'a'.repeat(101);
    formGroup.controls['registerEmailForm'].setValue(longValue);

    expect(service.validateField()).toBe(false);
  });
});
