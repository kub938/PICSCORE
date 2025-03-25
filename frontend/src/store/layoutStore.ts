// src/store/layoutStore.ts
import { create } from "zustand";

interface LayoutState {
  showBottomBar: boolean;
  showNavBar: boolean;
  content: string;
  setShowBottomBar: (show: boolean) => void;
  setShowNavBar: (show: boolean) => void;
  setContent: (content: string) => void;
  setLayoutVisibility: (options: {
    showBottomBar?: boolean;
    showNavBar?: boolean;
    content?: string;
  }) => void;
}
const useLayoutStore = create<LayoutState>((set) => ({
  showBottomBar: true,
  showNavBar: true,
  content: "conetnet",
  setShowBottomBar: (show) => set({ showBottomBar: show }),
  setShowNavBar: (show) => set({ showNavBar: show }),
  setContent: (content) => set({ content: content }),
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
      content: options.content !== undefined ? options.content : state.content,
    })),
}));

export default useLayoutStore;
