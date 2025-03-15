import { SidebarProvider } from "@/_components/ui/sidebar";
import AuthProvider from "@/_context/authProvider";
import Image from "next/image";
import { MenuApp } from "./_components/menu";
import { Profile } from "./_components/profile";
import { WalletResume } from "./_components/walletResume";

export default function RestrictLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col px-2 md:px-20 justify-between gap-1 h-full w-full">
        <header className="flex justify-between items-center border-b-2 p-2">
          <Image src="/logo.png" width={240} height={240} alt="HomeBroker" />
          <div className="flex gap-5">
            <div className="hidden lg:flex w-96 justify-center items-center content-center ">
              <WalletResume />
            </div>
            <Profile />
          </div>
        </header>
        <SidebarProvider className="min-h-min h-full">
          <div className="flex flex-row w-full h-full gap-1">
            <MenuApp />
            <div className="flex flex-col w-full gap-2 lg:px-2">
              <div className="flex w-full justify-center items-center lg:py-2 lg:hidden">
                <WalletResume />
              </div>
              <main className="flex flex-col w-full h-full">{children}</main>
            </div>
          </div>
        </SidebarProvider>
        <footer className="flex flex-col w-full justify-center text-[0.65rem] sm:text-xs text-center border-t-2 p-3">
          <span>Copyright © HomeBroker Software.</span>
          <span>Todos os direitos reservados</span>
        </footer>
      </div>
    </AuthProvider>
  );
}
