import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_COMMENT_THREAD: 'ADD_COMMENT_THREAD',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addCommentThreadActionCreator(commentThread) {
  return {
    type: ActionType.ADD_COMMENT_THREAD,
    payload: {
      commentThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      error;
    }
    dispatch(hideLoading());
  };
}

function asyncAddCommentThread({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const commentThread = await api.postCommentThread({ threadId: id, content });
      dispatch(addCommentThreadActionCreator(commentThread));
    } catch (error) {
      error;
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  addCommentThreadActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddCommentThread,
};
