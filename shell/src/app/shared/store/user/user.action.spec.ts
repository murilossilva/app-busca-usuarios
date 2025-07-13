import { setUser, clearUser } from './user.actions'; // ajuste o caminho conforme necessário
import { IUser } from '../../interfaces/user.interface';

describe('User Actions', () => {
  it('deve criar a action setUser com o payload correto', () => {
    const usuario: IUser = {
      id: '123',
      name: 'Teste',
      email: 'teste@teste.com'
      // inclua outras propriedades do IUser conforme sua interface
    };

    const action = setUser({ user: usuario });

    expect(action.type).toBe('[User] Set User');
    expect(action.user).toEqual(usuario);
  });

  it('deve criar a action clearUser sem payload', () => {
    const action = clearUser();

    expect(action.type).toBe('[User] Clear User');
    // clearUser não tem payload, então só valida o tipo mesmo
  });
});
