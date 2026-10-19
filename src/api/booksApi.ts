import { Book, ApiResponse } from '../features/books/types';

const INITIAL_BOOKS: Book[] = [
  { id: '1', title: 'Lập trình TypeScript', author: 'PTIT', category: 'CNTT', publishYear: 2023, availableCopies: 2 },
  { id: '2', title: 'Kinh tế vi mô', author: 'NXB Trẻ', category: 'Kinh tế', publishYear: 2021, availableCopies: 0 },
  { id: '3', title: 'English for IT', author: 'Oxford', category: 'Ngoại ngữ', publishYear: 2022, availableCopies: 5 },
  { id: '4', title: 'Cấu trúc dữ liệu', author: 'PTIT', category: 'CNTT', publishYear: 2020, availableCopies: 3 },
  {id : '5', title: 'Java Programming', author: 'NTU', category: 'CNTT', publishYear: 2011, availableCopies: 4 },
];

export const fetchBooksApi = (shouldFail: boolean = false): Promise<ApiResponse<Book[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách từ máy chủ.' });
      } else {
        resolve({ ok: true, data: INITIAL_BOOKS });
      }
    }, 500);
  });
};