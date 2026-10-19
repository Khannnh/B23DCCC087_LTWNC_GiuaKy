import booksReducer, {
  initialState,
  borrowBook,
  returnBook,
  loadBooks,
} from './booksSlice';
import { Book } from './types';

const mockBook: Book = {
  id: 'b1',
  title: 'React Nâng Cao',
  author: 'Author A',
  category: 'CNTT',
  publishYear: 2024,
  availableCopies: 2,
};

describe('booksSlice reducers', () => {
  // Test 1: Mượn sách thành công (giảm số bản, thêm ID vào borrowedBookIds)
  it('giảm availableCopies và thêm vào borrowedBookIds khi borrowBook', () => {
    const prevState = { ...initialState, books: [{ ...mockBook }] };
    const nextState = booksReducer(prevState, borrowBook('b1'));

    expect(nextState.books[0].availableCopies).toBe(1);
    expect(nextState.borrowedBookIds).toContain('b1');
  });

  // Test 2: Trả sách thành công (tăng số bản, bỏ ID khỏi borrowedBookIds)
  it('tăng availableCopies và loại khỏi borrowedBookIds khi returnBook', () => {
    const prevState = {
      ...initialState,
      books: [{ ...mockBook, availableCopies: 1 }],
      borrowedBookIds: ['b1'],
    };
    const nextState = booksReducer(prevState, returnBook('b1'));

    expect(nextState.books[0].availableCopies).toBe(2);
    expect(nextState.borrowedBookIds).not.toContain('b1');
  });

  // Test 3: Xử lý trạng thái pending khi loadBooks
  it('bật loading=true khi loadBooks.pending', () => {
    const nextState = booksReducer(initialState, { type: loadBooks.pending.type });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  // Test 4: Xử lý trạng thái fulfilled khi loadBooks
  it('cập nhật danh sách books và loading=false khi loadBooks.fulfilled', () => {
    const nextState = booksReducer(initialState, {
      type: loadBooks.fulfilled.type,
      payload: [mockBook],
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.books).toEqual([mockBook]);
  });
});