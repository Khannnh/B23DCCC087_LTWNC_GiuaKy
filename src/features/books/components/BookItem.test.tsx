/// <reference types="@types/jest" />
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookItem } from './BookItem';
import { Book } from '../types';

const bookSample: Book = {
  id: '101',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishYear: 2008,
  availableCopies: 3,
};

describe('BookItem Component', () => {
  // Test 1: Hiển thị đúng thông tin sách
  it('hiển thị đúng thông tin sách', () => {
    render(
      <BookItem
        book={bookSample}
        isBorrowed={false}
        onBorrow={jest.fn()}
        onReturn={jest.fn()}
      />
    );
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText(/Robert C. Martin/)).toBeInTheDocument();
    expect(screen.getByText(/Số bản còn lại: 3/)).toBeInTheDocument();
  });

  // Test 2: Click "Mượn" gọi đúng hàm với đúng ID sách
  it('click Mượn gọi đúng hàm với đúng id', async () => {
    const handleBorrow = jest.fn();
    render(
      <BookItem
        book={bookSample}
        isBorrowed={false}
        onBorrow={handleBorrow}
        onReturn={jest.fn()}
      />
    );

    const borrowBtn = screen.getByRole('button', { name: /Mượn/i });
    await userEvent.click(borrowBtn);

    expect(handleBorrow).toHaveBeenCalledTimes(1);
    expect(handleBorrow).toHaveBeenCalledWith('101');
  });

  // Test 3: Nút bị vô hiệu hoá khi hết bản (availableCopies = 0)
  it('nút Mượn bị vô hiệu hóa khi sách đã hết bản', () => {
    const outOfStockBook = { ...bookSample, availableCopies: 0 };
    render(
      <BookItem
        book={outOfStockBook}
        isBorrowed={false}
        onBorrow={jest.fn()}
        onReturn={jest.fn()}
      />
    );

    const borrowBtn = screen.getByRole('button', { name: /Mượn/i });
    expect(borrowBtn).toBeDisabled();
  });
});