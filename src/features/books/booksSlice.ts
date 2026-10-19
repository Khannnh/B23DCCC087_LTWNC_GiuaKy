import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, isApiSuccess } from './types';
import { fetchBooksApi } from '../../api/booksApi';

export interface BooksState {
  books: Book[];
  borrowedBookIds: string[];
  loading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: [],
  borrowedBookIds: [],
  loading: false,
  error: null,
};

export const loadBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/loadBooks',
  async (shouldFail = false, { rejectWithValue }) => {
    const response = await fetchBooksApi(shouldFail);
    if (isApiSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const targetBook = state.books.find((b) => b.id === bookId);
      if (targetBook && targetBook.availableCopies > 0 && !state.borrowedBookIds.includes(bookId)) {
        targetBook.availableCopies -= 1;
        state.borrowedBookIds.push(bookId);
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const targetBook = state.books.find((b) => b.id === bookId);
      if (targetBook && state.borrowedBookIds.includes(bookId)) {
        targetBook.availableCopies += 1;
        state.borrowedBookIds = state.borrowedBookIds.filter((id) => id !== bookId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã có lỗi xảy ra.';
      });
  },
});

export const { borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;