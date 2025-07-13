import { userReducer, initialState, UserState } from './user.reducer';
import { setUser, clearUser } from './user.actions';
import { IUser } from '../../interfaces/user.interface';

describe('User Reducer', () => {
  const usuario: IUser = {
    id: '123',
    name: 'Teste',
    email: 'teste@teste.com'
  };

  it('deve retornar o estado inicial quando passado um estado indefinido', () => {
    const action = { type: 'acao-aleatoria' } as any;
    const state = userReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it('deve setar o usuário no estado quando a action setUser for disparada', () => {
    const action = setUser({ user: usuario });
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(usuario);
  });

  it('deve limpar o usuário no estado quando a action clearUser for disparada', () => {
    const estadoComUsuario: UserState = {
      user: usuario,
    };
    const action = clearUser();
    const state = userReducer(estadoComUsuario, action);

    expect(state).toEqual({
      user: null,
    });
  });
});
