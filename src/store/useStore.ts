import create from 'zustand';

interface StoreState {
  visibleSection: string;
  setVisibleSection: (section: string) => void;
}

const useStore = create<StoreState>((set) => ({
  visibleSection: 'description', 
  setVisibleSection: (section) => set({ visibleSection: section }),
}));

export default useStore;
