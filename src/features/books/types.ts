// Thể loại sách
export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

// Thực thể Sách
export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishYear: number;
  availableCopies: number;
}

export type BookPreview = Pick<Book, 'id' | 'title' | 'author'>;
export type NewBookPayload = Omit<Book, 'id'>;

// Generic API Response
export type ApiResponseSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiResponseError = {
  ok: false;
  error: string;
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

// Custom Type Guard để thu hẹp kiểu phân biệt Success / Error
export function isApiSuccess<T>(res: ApiResponse<T>): res is ApiResponseSuccess<T> {
  return res.ok === true;
}