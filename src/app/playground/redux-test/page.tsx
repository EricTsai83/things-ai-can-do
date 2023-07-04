'use client';
import type { RootState } from '@/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '@/GlobalRedux/Features/counter/counterSlice';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="border bg-gray-400"
        onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button
        className="border bg-gray-400"
        onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <button
        className="border bg-gray-400"
        onClick={() => dispatch(incrementByAmount(2))}>
        Increment by 2
      </button>
    </main>
  );
}
