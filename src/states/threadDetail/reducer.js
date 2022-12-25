import { ActionType } from './action';
/* eslint-disable no-case-declarations */
function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.UPVOTE_DETAIL_THREAD:
      return (threadDetail.upVotesBy.includes(action.payload.userId) || threadDetail.downVotesBy.includes(action.payload.userId))
        ? {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        }
        : { ...threadDetail, upVotesBy: threadDetail.upVotesBy.concat([action.payload.userId]) };
    case ActionType.DOWNVOTE_DETAIL_THREAD:
      return (threadDetail.downVotesBy.includes(action.payload.userId) || threadDetail.upVotesBy.includes(action.payload.userId))
        ? {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        }
        : { ...threadDetail, downVotesBy: threadDetail.downVotesBy.concat([action.payload.userId]) };
    case ActionType.UPVOTE_COMMENT_THREAD:
      const upVoteComment = threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const voteComment = comment.upVotesBy.includes(action.payload.userId) || comment.downVotesBy.includes(action.payload.userId);
          return voteComment ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          }
            : { ...comment, upVotesBy: comment.upVotesBy.concat([action.payload.userId]) };
        }
        return comment;
      });
      return { ...threadDetail, comments: upVoteComment };
    case ActionType.DOWNVOTE_COMMENT_THREAD:
      const downVoteComment = threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const voteComment = comment.downVotesBy.includes(action.payload.userId) || comment.upVotesBy.includes(action.payload.userId);
          return voteComment ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          }
            : { ...comment, downVotesBy: comment.downVotesBy.concat([action.payload.userId]) };
        }
        return comment;
      });
      return { ...threadDetail, comments: downVoteComment };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
