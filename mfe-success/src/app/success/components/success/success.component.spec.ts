import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SuccessComponent } from './success.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let httpMock: HttpTestingController;
  let activatedRouteMock: any;
  let routerMock: any;
  let storeMock: any;

  beforeEach(async () => {
    // Mock do ActivatedRoute com um Subject para emitir queryParams
    activatedRouteMock = {
      queryParams: new Subject(),
    };

    // Mock do Router com spy no navigate
    routerMock = {
      navigate: jest.fn(),
    };

    // Mock do Store com dispatch e select
    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of({ user: null })),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SuccessComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar usuário no ngOnInit quando id está presente', fakeAsync(() => {
    fixture.detectChanges();

    // Emitir queryParams com id
    activatedRouteMock.queryParams.next({ id: '123' });

    // Esperar subscription
    tick();

    // Espera requisição HTTP GET para o usuário com id '123'
    const req = httpMock.expectOne('http://localhost:3000/users/123');
    expect(req.request.method).toBe('GET');

    // Responder a requisição com um usuário mock
    const userMock = { id: '123', name: 'Teste', email: 'teste@teste.com' };
    req.flush(userMock);

    expect(component.user).toEqual(userMock);
  }));

  it('não deve buscar usuário se id não estiver presente', fakeAsync(() => {
    fixture.detectChanges();

    // Emitir queryParams sem id
    activatedRouteMock.queryParams.next({});

    tick();

    // Nenhuma requisição HTTP deve ser feita
    httpMock.expectNone('http://localhost:3000/users/');

    expect(component.user).toBeUndefined();
  }));

  it('deve logar erro quando a requisição HTTP falhar no ngOnInit', fakeAsync(() => {
    fixture.detectChanges();

    // Espiona o console.error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Emitir queryParams com id
    activatedRouteMock.queryParams.next({ id: '123' });

    tick();

    // Espera requisição HTTP GET para o usuário com id '123'
    const req = httpMock.expectOne('http://localhost:3000/users/123');
    expect(req.request.method).toBe('GET');

    // Simula erro na requisição
    const mockError = new ErrorEvent('Network error');
    req.error(mockError);

    // Verifica se console.error foi chamado com o erro
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  }));

  it('deve navegar para /register quando backToRegister for chamado', () => {
    component.backToRegister();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
  });
});
