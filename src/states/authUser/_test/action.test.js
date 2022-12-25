/**
 * skenario test authUser thunk
 *
 * - asyncSetAuthUser thunk
 *  - should successfully fetch data, saved access token to localStorage, dispatch authUser action correctly and return token value.
 *  - should return error when data fetching failed
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly and remove access token from localStorage.
 */
import api from '../../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../action';

describe('authUser thunk', () => {
  describe('asyncSetAuthUser thunk', () => {
    beforeEach(() => {
      api._getOwnProfile = api.getOwnProfile;
      api._login = api.login;
      api._putAccessToken = api.putAccessToken;
    });

    afterEach(() => {
      api.putAccessToken = api._putAccessToken;
      api.login = api._login;
      api.getOwnProfile = api._getOwnProfile;

      delete api._getOwnProfile;
      delete api._login;
      delete api._getOwnProfile;
    });

    it('should successfully fetch data, saved token to localstorage, dispatch authUser action correctly and return token value.', async () => {
      // arrange
      const fakeToken = 'token-123';
      const payload = {
        email: 'john@example.com',
        password: 'johndoe',
      };
      const authUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      };
      // stub implementation
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken(fakeToken);
      api.getOwnProfile = () => Promise.resolve(authUser);
      // mock dispatch
      const dispatch = jest.fn();

      // action
      const token = await asyncSetAuthUser(payload)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(authUser));
      expect(token).toEqual(fakeToken);
    });

    it('should return error when data fetching failed', async () => {
      // arrange
      const fakeToken = 'token-123';
      const payload = {
        email: 'john@example.com',
        password: 'johndoe',
      };
      const fakeErrorResponse = new Error('Ups, something went wrong');
      // stub implementation
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken(fakeToken);
      api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
      // mock dispatch
      const dispatch = jest.fn();

      // action
      const errorResponse = await asyncSetAuthUser(payload)(dispatch);

      // assert
      expect(errorResponse.message).toEqual(fakeErrorResponse.message);
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action correctly and remove access token from localStorage.', () => {
      // arrange
      api.putAccessToken('');
      // mock dispatch
      const dispatch = jest.fn();

      // action
      asyncUnsetAuthUser()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    });
  });
});
