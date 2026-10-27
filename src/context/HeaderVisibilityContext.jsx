import { createContext, useContext } from "react";

export const HeaderVisibilityContext = createContext(true);

export function useHeaderVisibility() {
  return useContext(HeaderVisibilityContext);
}