"use client";
// @ts-nocheck

import { AlertContext } from "@/_context/alertContext";
import { AlertCircle } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

interface AlertErrorProps {
  children: ReactNode;
}

export function AlertError({ children }: AlertErrorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("Something went wrong!");

  const openError = (errorMessage: string, newTitle?: string) => {
    setTitle(newTitle || "Something went wrong!");
    setError(errorMessage);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <AlertContext.Provider value={{ openError }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="flex items-end md:items-center bg-transparent w-full md:w-fit h-full shadow-none m-0 p-0 border-0">
          <div className="bg-background overflow-y-auto w-full md:w-fit h-fit mb-2 md:mb-0 mx-2 md:mx-0">
            <div className="flex px-3 md:px-6 py-3 md:py-6 gap-2 md:gap-4 items-center">
              <div className="flex items-center justify-center rounded-full bg-destructive/10 p-4">
                <AlertCircle className="text-destructive size-7" />
              </div>
              <AlertDialogHeader className="dark:text-secondary">
                <AlertDialogTitle className="flex w-full text-base md:text-lg font-bold">
                  {title}
                </AlertDialogTitle>
                {error && (
                  <AlertDialogDescription className="text-xs md:text-sm">
                    {error}
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter className="flex w-full border-t-[1px] border-black">
              <AlertDialogCancel
                className="w-full h-full py-4 border-0 hover:bg-slate-200 text-primary font-bold hover:text-primary/80"
                onClick={close}
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
}
