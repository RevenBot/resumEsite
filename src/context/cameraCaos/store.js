import { create } from "zustand";

const useStore = create((set) => ({
  autoRotate: true,
  updateRotate: (rotate) => set(() => ({ autoRotate: rotate })),
}));
export default useStore;
