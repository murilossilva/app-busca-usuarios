import { successGuard } from './success.guard';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('Guard: successGuard', () => {
  let mockStore: Partial<jest.Mocked<Store<any>>>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockStore = {
      select: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('deve permitir acesso quando o usuário possui um ID', (done) => {
    mockStore.select!.mockReturnValue(of({ id: '123', nome: 'Murilo' }));

    // Executa o guard dentro do contexto de injeção do Angular
    const resultado$ = TestBed.runInInjectionContext(() => successGuard());

    resultado$.subscribe((resultado) => {
      expect(resultado).toBe(true);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('deve negar acesso e redirecionar para a raiz quando o usuário não possui ID', (done) => {
    mockStore.select!.mockReturnValue(of({ id: null }));

    const resultado$ = TestBed.runInInjectionContext(() => successGuard());

    resultado$.subscribe((resultado) => {
      expect(resultado).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
