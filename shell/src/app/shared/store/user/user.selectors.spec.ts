import { selectUserState, selectUser } from './user.selectors';
import { UserState } from './user.reducer';

describe('User Selectors', () => {
  const usuarioMock = {
    id: '123',
    name: 'Teste',
    email: 'teste@teste.com'
  };

  const estadoMock: { user: UserState } = {
    user: {
      user: usuarioMock,
    },
  };

  it('deve retornar o estado de usuário completo com selectUserState', () => {
    const resultado = selectUserState(estadoMock);

    expect(resultado).toEqual(estadoMock.user);
  });

  it('deve retornar o usuário com selectUser', () => {
    const resultado = selectUser(estadoMock);

    expect(resultado).toEqual(usuarioMock);
  });

  it('deve retornar null se não houver usuário', () => {
    const estadoSemUsuario: { user: UserState } = {
      user: {
        user: null,
      },
    };

    const resultado = selectUser(estadoSemUsuario);

    expect(resultado).toBeNull();
  });
});
