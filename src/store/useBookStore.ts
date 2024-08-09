import create from 'zustand';

interface BookStoreState {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  priceRange: [0, 1500],
  setPriceRange: (range) => set({ priceRange: range }),
  selectedCategories: [],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
}));