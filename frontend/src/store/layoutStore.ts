// src/store/layoutStore.ts
import { create } from "zustand";

interface LayoutState {
  showBottomBar: boolean;
  showNavBar: boolean;
  setShowBottomBar: (show: boolean) => void;
  setShowNavBar: (show: boolean) => void;
  setLayoutVisibility: (options: {
    showBottomBar?: boolean;
    showNavBar?: boolean;
  }) => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  showBottomBar: true,
  showNavBar: true,
  setShowBottomBar: (show) => set({ showBottomBar: show }),
  setShowNavBar: (show) => set({ showNavBar: show }),
  setLayoutVisibility: (options) =>
    set((state) => ({
      showBottomBar:
        options.showBottomBar !== undefined
          ? options.showBottomBar
          : state.showBottomBar,
      showNavBar:
        options.showNavBar !== undefined
          ? options.showNavBar
          : state.showNavBar,
    })),
}));

export default useLayoutStore;
