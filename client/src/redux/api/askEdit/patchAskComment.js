import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const patchToEditComment = createAsyncThunk(
  'ask/postEditComment',
  async (
    { content, token, questionId, commentId },
    { getState, requestId }
  ) => {
    const { currentRequestId, loading } = getState().patchComment;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      // pending 상태가 아니거나 요청한 id가 갖지않다면 바로 return
      return;
    }

    const response = await axios.patch(
      `${url}/questions/${questionId}/comments/${commentId}`,
      {
        questionCommentContent: content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(response);
    return response;
  }
);
