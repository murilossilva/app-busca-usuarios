import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { IUser } from '../../interfaces/user.interface';

export interface UserState {
  user: IUser | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(clearUser, state => ({ ...state, user: null }))
);
