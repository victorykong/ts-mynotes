/**
 * like reducer
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLike } from 'src/api';

// 获取点赞数
export const fetchLikeCount = createAsyncThunk(
  'like/fetchLikeCount',
  async (param, thunkAPI) => {
    const res: any = await getLike();
    return res.data;
  }
);

const initialState = {
  count: 0,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLikeCount.fulfilled, (state, action) => {
      state.count = action.payload.good_sum;
    });
  },
});

export const likeReducer = likeSlice.reducer;

export const likeActions = likeSlice.actions;
