import React from 'react';
import { Book } from '../types';

interface BookItemProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

export const BookItem: React.FC<BookItemProps> = React.memo(({
  book,
  isBorrowed,
  onBorrow,
  onReturn,
}) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '8px', padding: '12px', borderRadius: '6px' }}>
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.category} | Năm: {book.publishYear}</p>
      <p>Số bản còn lại: {book.availableCopies}</p>
      {isBorrowed ? (
        <button onClick={() => onReturn(book.id)}>Trả</button>
      ) : (
        <button
          onClick={() => onBorrow(book.id)}
          disabled={book.availableCopies <= 0}
        >
          Mượn
        </button>
      )}
    </div>
  );
});