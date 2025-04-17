"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type UserMode = "creator" | "subscriber" | "other";

interface UserModeContextProps {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
}

export const UserModeContext = createContext<UserModeContextProps | undefined>(
  undefined
);

export function UserModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UserMode>("subscriber");

  return (
    <UserModeContext.Provider value={{ mode, setMode }}>
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (!context) {
    throw new Error("useUserMode must be used within a UserModeProvider");
  }
  return context;
}
