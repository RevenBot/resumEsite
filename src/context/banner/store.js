import { create } from "zustand";

const useStore = create((set) => ({
  bannerMessage: "default",
  updateStatus: (message) => set(() => ({ bannerMessage: message })),
  resetStatus: () => set(() => ({ bannerMessage: "default" })),
}));
export default useStore;
