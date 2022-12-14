/* eslint-disable array-callback-return */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_COMMENT_THREAD: 'ADD_COMMENT_THREAD',
  UPVOTE_DETAIL_THREAD: 'UPVOTE_DETAIL_THREAD',
  DOWNVOTE_DETAIL_THREAD: 'DOWNVOTE_DETAIL_THREAD',
  UPVOTE_COMMENT_THREAD: 'UPVOTE_COMMENT_THREAD',
  DOWNVOTE_COMMENT_THREAD: 'DOWNVOTE_COMMENT_THREAD',
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

function upVoteCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function upVoteThreadActionCreator(userId) {
  return {
    type: ActionType.UPVOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function downVoteThreadActionCreator(userId) {
  return {
    type: ActionType.DOWNVOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function downVoteCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
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
    try {
      dispatch(showLoading());
      const commentThread = await api.postCommentThread({ threadId: id, content });
      dispatch(addCommentThreadActionCreator(commentThread));
      return commentThread;
    } catch (error) {
      dispatch(hideLoading());
      return error;
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(upVoteThreadActionCreator(authUser.id));
    try {
      (threadDetail.upVotesBy.includes(authUser.id) || threadDetail.downVotesBy.includes(authUser.id))
        ? api.postNeutralVoteThread(threadId) : api.postUpVoteThread(threadId);
    } catch (error) {
      dispatch(upVoteThreadActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(downVoteThreadActionCreator(authUser.id));
    try {
      (threadDetail.downVotesBy.includes(authUser.id) || threadDetail.upVotesBy.includes(authUser.id))
        ? api.postNeutralVoteThread(threadId) : api.postDownVoteThread(threadId);
    } catch (error) {
      dispatch(downVoteThreadActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteCommentThread(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const { comments } = threadDetail;
    dispatch(upVoteCommentThreadActionCreator({ commentId, userId: authUser.id }));
    try {
      if (comments.length) {
        comments.map(({ upVotesBy, downVotesBy }) => {
          const voteComment = upVotesBy.includes(authUser.id) || downVotesBy.includes(authUser.id);
          voteComment ? api.postNeutralVoteCommentThread(threadId, commentId) : api.postUpVoteCommentThread(threadId, commentId);
        });
      }
    } catch (error) {
      dispatch(upVoteCommentThreadActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteCommentThread(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const { comments } = threadDetail;
    dispatch(downVoteCommentThreadActionCreator({ commentId, userId: authUser.id }));
    try {
      if (comments.length) {
        comments.map(({ upVotesBy, downVotesBy }) => {
          const voteComment = downVotesBy.includes(authUser.id) || upVotesBy.includes(authUser.id);
          voteComment ? api.postNeutralVoteCommentThread(threadId, commentId) : api.postDownVoteCommentThread(threadId, commentId);
        });
      }
    } catch (error) {
      dispatch(downVoteCommentThreadActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  addCommentThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  upVoteCommentThreadActionCreator,
  downVoteCommentThreadActionCreator,
  asyncReceiveThreadDetail,
  asyncAddCommentThread,
  asyncUpVoteCommentThread,
  asyncDownVoteCommentThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
};
