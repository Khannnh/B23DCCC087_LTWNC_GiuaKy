import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export const borrowLimitMiddleware: Middleware<{}, RootState> = (storeApi) => (next) => (action: any) => {
  if (action.type === 'books/borrowBook') {
    const state = storeApi.getState();
    if (state.books.borrowedBookIds.length >= 3) {
      alert('Cảnh báo: Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc!');
      return; // Chặn không cho dispatch vào reducer
    }
  }
  return next(action);
};