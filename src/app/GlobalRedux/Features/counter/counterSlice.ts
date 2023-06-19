'use client';

import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// slice 可以透過 createSlice 產生，指的是將許多的 reducer 或 actions 集合起來
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
