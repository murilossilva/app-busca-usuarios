import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RegisterFormService } from '../../services/register-form/register-form.service';
import { UserService } from '../../services/user-service/user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let componente: RegisterComponent;
  let fixture: any;

  let servicoFormularioMock: any;
  let servicoUsuarioMock: any;
  let lojaMock: any;
  let roteadorMock: any;

  beforeEach(async () => {
    servicoFormularioMock = {
      currentRegisterFieldForm: new FormGroup({
        registerNameForm: new FormControl(''),
        registerEmailForm: new FormControl(''),
      }),
    };

    servicoUsuarioMock = {
      createUser: jest.fn().mockReturnValue(of({ id: '1', name: 'Teste', email: 'teste@teste.com' })),
      isLoading$: of(false),
    };

    lojaMock = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of({ user: null })),
    };

    roteadorMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterFormService, useValue: servicoFormularioMock },
        { provide: UserService, useValue: servicoUsuarioMock },
        { provide: Store, useValue: lojaMock },
        { provide: Router, useValue: roteadorMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  test('onEmailInputChange deve redefinir emailDuplicado se estiver true', () => {
    componente.emailDuplicated = true;
    componente.onEmailInputChange();
    expect(componente.emailDuplicated).toBe(false);
  });

  test('onEmailInputChange não deve alterar emailDuplicado se estiver false', () => {
    componente.emailDuplicated = false;
    componente.onEmailInputChange();
    expect(componente.emailDuplicated).toBe(false);
  });

  describe('onSubmit', () => {
    test('não deve chamar createUser se o formulário for inválido', () => {
      componente.registerForm.setErrors({ invalid: true });
      componente.onSubmit();
      expect(servicoUsuarioMock.createUser).not.toHaveBeenCalled();
    });

    test('deve criar usuário, resetar formulário, despachar ação e navegar em caso de sucesso', fakeAsync(() => {
      componente.registerForm.setValue({ registerNameForm: 'Teste', registerEmailForm: 'email@teste.com' });
      servicoUsuarioMock.createUser.mockReturnValueOnce(of({ id: '10', name: 'Nome', email: 'email@teste.com' }));

      componente.onSubmit();
      tick();

      expect(servicoUsuarioMock.createUser).toHaveBeenCalledWith({
        name: 'Teste',
        email: 'email@teste.com',
      });

      expect(componente.registerForm.value).toEqual({ registerNameForm: null, registerEmailForm: null });

      expect(componente.emailDuplicated).toBe(false);
      expect(componente.connectionError).toBe(false);
      expect(componente.unknownError).toBe(false);

      expect(lojaMock.dispatch).toHaveBeenCalledWith({
        type: '[User] Set User',
        user: { id: '10', name: 'Nome', email: 'email@teste.com' },
      });

      expect(roteadorMock.navigate).toHaveBeenCalledWith(['/success'], { queryParams: { id: '10' } });
    }));

    test('deve definir emailDuplicado true se erro com status 409', fakeAsync(() => {
      componente.registerForm.setValue({ registerNameForm: 'Nome', registerEmailForm: 'email@teste.com' });
      servicoUsuarioMock.createUser.mockReturnValueOnce(throwError(() => ({ status: 409 })));

      componente.onSubmit();
      tick();

      expect(componente.emailDuplicated).toBe(true);
      expect(componente.alertTrigger).toBe(false);
      expect(componente.connectionError).toBe(false);
      expect(componente.unknownError).toBe(false);
    }));

    test('deve definir connectionError true e alternar alertTrigger para status 0 ou 500', fakeAsync(() => {
      componente.registerForm.setValue({ registerNameForm: 'Nome', registerEmailForm: 'email@teste.com' });

      servicoUsuarioMock.createUser.mockReturnValueOnce(throwError(() => ({ status: 0 })));
      componente.onSubmit();
      tick();
      expect(componente.connectionError).toBe(true);
      expect(componente.alertTrigger).toBe(true);

      componente.alertTrigger = false;
      servicoUsuarioMock.createUser.mockReturnValueOnce(throwError(() => ({ status: 500 })));
      componente.onSubmit();
      tick();
      expect(componente.connectionError).toBe(true);
      expect(componente.alertTrigger).toBe(true);
    }));

    test('deve definir unknownError true e alternar alertTrigger para outros erros', fakeAsync(() => {
      componente.registerForm.setValue({ registerNameForm: 'Nome', registerEmailForm: 'email@teste.com' });
      servicoUsuarioMock.createUser.mockReturnValueOnce(throwError(() => ({ status: 999 })));

      componente.onSubmit();
      tick();

      expect(componente.unknownError).toBe(true);
      expect(componente.alertTrigger).toBe(true);
    }));
  });

  test('cleanErrorMessages deve resetar todas as flags de erro', () => {
    componente.emailDuplicated = true;
    componente.connectionError = true;
    componente.unknownError = true;

    componente.cleanErrorMessages();

    expect(componente.emailDuplicated).toBe(false);
    expect(componente.connectionError).toBe(false);
    expect(componente.unknownError).toBe(false);
  });
});
