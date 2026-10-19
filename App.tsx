import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#1e1e1e',
      color: theme === 'light' ? '#212529' : '#f8f9fa',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: 'sans-serif'
    }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>📚 Mini Library</h2>
          <button 
            onClick={toggleTheme}
            style={{ padding: '8px 14px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Chế độ: {theme === 'light' ? '☀️ Sáng' : '🌙 Tối'}
          </button>
        </div>
        <nav style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
          <Link to="/" style={{ color: 'inherit', fontWeight: 'bold' }}>Trang chủ</Link>
          <Link to="/stats" style={{ color: 'inherit', fontWeight: 'bold' }}>Thống kê</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Tìm kiếm sách hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: '8px 12px', minWidth: '260px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as BookCategory | 'Tất cả')}
                  style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
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