import React, { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { borrowBook, returnBook } from '../booksSlice';
import { useFilterStore } from '../../filters/useFilterStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { BookItem } from './BookItem';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, borrowedBookIds } = useAppSelector((state) => state.books);
  const { searchTerm, selectedCategory } = useFilterStore();
  
  // Áp dụng Debounce 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // useMemo tối ưu tính toán danh sách sau khi lọc
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchKeyword =
        b.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchCat =
        selectedCategory === 'Tất cả' || b.category === selectedCategory;
      return matchKeyword && matchCat;
    });
  }, [books, debouncedSearchTerm, selectedCategory]);

  // useCallback tối ưu handler truyền xuống component con
  const handleBorrow = useCallback((id: string) => {
    dispatch(borrowBook(id));
  }, [dispatch]);

  const handleReturn = useCallback((id: string) => {
    dispatch(returnBook(id));
  }, [dispatch]);

  return (
    <div>
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id} // Không dùng index làm key
          book={book}
          isBorrowed={borrowedBookIds.includes(book.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </div>
  );
};