import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginUser, logoutUser } from "../services/authService";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            loginAction: async (email, password) => {
                const result = await loginUser(email, password);
                if (result.success) {
                    set({ user: result.user });
                }
                return result;
            },

            logoutAction: async () => {
                const result = await logoutUser();
                if (result.success) {
                    set({ user: null });
                }
                return result;
            },

            // Acciones síncronas básicas si se necesitan
            login: (userData) => set({ user: userData }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useAuthStore;