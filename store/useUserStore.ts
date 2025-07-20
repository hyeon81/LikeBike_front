import { IUserProfile } from "@/types/user";
import { create } from "zustand";
import axios from "axios";
import { getProfile } from "@/apis/user/getProfile";

const useUserStore = create<{
  user: IUserProfile | null;
  setUser: (user: IUserProfile) => void;
  fetchUser: () => Promise<void>;
}>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    if (get().user === null) {
      try {
        const res = await getProfile();
        set({ user: res });
      } catch (error) {
        // handle error as needed
        set({ user: null });
      }
    }
  },
}));

export default useUserStore;
