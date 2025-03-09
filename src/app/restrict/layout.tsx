import AuthProvider from "@/_context/authProvider";
import Image from "next/image";
import { UserProps } from "./_components/userProps";

export default function RestrictLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col px-2 md:px-20 justify-between gap-4 h-full">
        <header className="flex justify-between items-center border-b-2 p-3 h-20">
          <Image src="/logo.png" width={240} height={240} alt="HomeBroker" />
          <UserProps />
        </header>
        <body className="">{children}</body>
        <footer className="flex flex-col w-full justify-center text-[0.65rem] sm:text-xs text-center border-t-2 p-3">
          <span>Copyright © HomeBroker Software.</span>
          <span>Todos os direitos reservados</span>
        </footer>
      </div>
    </AuthProvider>
  );
}
