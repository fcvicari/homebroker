import { createContext } from "react";

interface AlertContextProps {
  openError: (message: string, title?: string) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(
  undefined,
);
