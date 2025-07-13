import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IUser } from '../../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    it('deve fazer POST para criar usuário e alterar isLoading corretamente', (done) => {
      const userMock: IUser = {
        name: 'João',
        email: 'joao@teste.com'
      };

      const loadingStates: boolean[] = [];

      service.isLoading$.subscribe((state) => loadingStates.push(state));

      service.createUser(userMock).subscribe((res) => {
        expect(res).toEqual({ ...userMock, id: 1 }); // Simula resposta com id
        expect(loadingStates).toContain(true);
        expect(loadingStates).toContain(false);
        done();
      });

      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toBe('POST');
      req.flush({ ...userMock, id: 1 }); // Simula resposta da API
    });
  });

  describe('getIUsers', () => {
    it('deve fazer GET para retornar lista de usuários', (done) => {
      const usersMock: IUser[] = [
        { id: '1', name: 'João', email: 'joao@teste.com' },
        { id: '2', name: 'Maria', email: 'maria@teste.com' }
      ];

      service.getIUsers().subscribe((res) => {
        expect(res).toEqual(usersMock);
        done();
      });

      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toBe('GET');
      req.flush(usersMock);
    });
  });
});
