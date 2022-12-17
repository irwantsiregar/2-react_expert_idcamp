/**
 * skenario test asyncPreloadProcess
 *
 * - asyncPreloadProcess thunk
 *  - should successfully fetch data, dispatch authUser action and finally with dispatch isPreload action correctly
 *  - should dispatch authUser action correctly when data fetching failed and finally with dispatch isPreload action
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from '../action';
import { setAuthUserActionCreator } from '../../authUser/action';

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it('should successfully fetch data, dispatch authUser action and finally with dispatch isPreload action correctly', async () => {
    // arrange
    const authUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(authUser);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(authUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch authUser action correctly when data fetching failed and finally with dispatch isPreload action', async () => {
    // arrange
    const fakeErrorResponse = new Error('Ups, something went wrong');

    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
