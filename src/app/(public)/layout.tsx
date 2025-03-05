import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <main className="flex w-full h-full px-3">{children}</main>
    </div>
  );
}
