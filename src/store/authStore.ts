import { UserProfile } from "@/types/login/loginTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  profile: UserProfile | null
  setTokens: (accessToken: string, refreshToken: string) => void
  setProfile: (profile: UserProfile) => void
  clearTokens: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      profile: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setProfile: (profile) => set({ profile }),
      clearTokens: () => set({ accessToken: null, refreshToken: null, profile: null }),
    }),
    {
      name: "auth-storage",
    }
  )
)
