import { create } from 'zustand';
import { BookCategory } from '../books/types';

interface FilterState {
  searchTerm: string;
  selectedCategory: BookCategory | 'Tất cả';
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (cat: BookCategory | 'Tất cả') => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  selectedCategory: 'Tất cả',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
}));