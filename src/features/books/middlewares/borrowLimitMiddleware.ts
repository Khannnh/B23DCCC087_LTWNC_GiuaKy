import { Middleware } from '@reduxjs/toolkit';
import { BooksState } from '../booksSlice';

// Định nghĩa kiểu RootState tối thiểu cho middleware này, không import ngược từ store.ts
type MiddlewareState = {
  books: BooksState;
};

export const borrowLimitMiddleware: Middleware<{}, MiddlewareState> = (storeApi) => (next) => (action: unknown) => {
  const typedAction = action as { type: string };

  if (typedAction?.type === 'books/borrowBook') {
    const state = storeApi.getState();
    if (state.books.borrowedBookIds.length >= 3) {
      alert('Cảnh báo: Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc!');
      return; // Chặn dispatch
    }
  }

  return next(action);
};