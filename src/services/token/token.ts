import {TToken} from '../../types/server-entities';

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): TToken => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: TToken): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const deleteToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
