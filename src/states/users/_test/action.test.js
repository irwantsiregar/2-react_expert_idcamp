/**
 * skenario test registerUser thunk
 *
 * - asyncRegisterUser thunk
 *  - should return boolean(true) value when data fetching success.
 *  - should return error when data fetching failed.
 */
import api from '../../../utils/api';
import {
  asyncRegisterUser,
} from '../action';

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should return boolean(true) value when data fetching success.', async () => {
    // arrange
    const payload = {
      email: 'john@example.com',
      name: 'John Doe',
      password: 'johndoe',
    };
    const fakeUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    // stub implementation
    api.register = () => Promise.resolve(fakeUser);

    // action
    const successRegister = await asyncRegisterUser(payload)();

    // assert
    expect(successRegister).toBeTruthy();
  });

  it('should return error when data fetching failed', async () => {
    // arrange
    const payload = {
      email: 'john@example.com',
      name: 'John Doe',
      password: 'johndoe',
    };
    const fakeErrorResponse = new Error('Ups, something went wrong');
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);

    // action
    const errorResponse = await asyncRegisterUser(payload)();

    // assert
    expect(errorResponse.message).toEqual(fakeErrorResponse.message);
  });
});
