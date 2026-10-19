// src/App.tsx
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './src/app/hooks';
import { loadBooks } from './src/features/books/booksSlice';
import { BookList } from './src/features/books/components/BookList';
import { useFilterStore } from './src/features/filters/useFilterStore';
import { useTheme } from './src/context/ThemeContext';
import { BookCategory } from './src/features/books/types';

const StatsPage = React.lazy(() => import('./src/pages/StatsPage'));

export function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.books);
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useFilterStore();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#fff' : '#222',
      color: theme === 'light' ? '#000' : '#fff',
      minHeight: '100vh',
      padding: '16px'
    }}>
      <header>
        <h1>Mini Library</h1>
        <button onClick={toggleTheme}>Đổi sang chế độ {theme === 'light' ? 'Tối' : 'Sáng'}</button>
        <nav style={{ margin: '10px 0' }}>
          <Link to="/" style={{ marginRight: '10px', color: 'inherit' }}>Trang chủ</Link>
          <Link to="/stats" style={{ color: 'inherit' }}>Thống kê</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sách hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as BookCategory | 'Tất cả')}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="CNTT">CNTT</option>
                  <option value="Kinh tế">Kinh tế</option>
                  <option value="Ngoại ngữ">Ngoại ngữ</option>
                </select>
              </div>

              {loading && <p>Đang tải...</p>}
              {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
              {!loading && !error && <BookList />}
            </main>
          }
        />
        <Route
          path="/stats"
          element={
            <Suspense fallback={<p>Đang tải trang thống kê...</p>}>
              <StatsPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}