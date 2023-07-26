import { ReactNode, createContext } from "react";

import { AppContext } from "./app-context";

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
