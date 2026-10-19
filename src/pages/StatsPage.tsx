// src/pages/StatsPage.tsx
import React from 'react';
import { useAppSelector } from '../app/hooks';

const StatsPage: React.FC = () => {
  const { books, borrowedBookIds } = useAppSelector((state) => state.books);

  const stats = {
    cntt: books.filter((b) => b.category === 'CNTT').length,
    kinhTe: books.filter((b) => b.category === 'Kinh tế').length,
    ngoaiNgu: books.filter((b) => b.category === 'Ngoại ngữ').length,
  };

  return (
    <div>
      <h2>Trang Thống Kê</h2>
      <p>Số sách CNTT: {stats.cntt}</p>
      <p>Số sách Kinh tế: {stats.kinhTe}</p>
      <p>Số sách Ngoại ngữ: {stats.ngoaiNgu}</p>
      <p>Số sách đang mượn: {borrowedBookIds.length}</p>
    </div>
  );
};
export default StatsPage;