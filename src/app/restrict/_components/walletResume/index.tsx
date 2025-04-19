import { options } from "@/app/api/auth/[...nextauth]/options";
import { AddWallet } from "@/app/restrict/_components/addWallet";
import { Wallet } from "lucide-react";
import { getServerSession } from "next-auth";
import { WalletList } from "../walletList.tsx";

export async function WalletResume() {
  const session = await getServerSession(options);
  if (!session) return null;

  let userWallet = undefined;
  if (session.user.wallet) {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + `/wallet/${session.user.wallet}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        cache: "no-store",
      }
    );

    userWallet = await response.json();
  }

  if (!userWallet) {
    return (
      <span className="flex flex-col md:flex-row text-xs gap-2 lg:text-sm font-bold p-3 md:p-6 items-end md:items-center md:w-full justify-end">
        {!userWallet && <AddWallet />}
      </span>
    );
  }

  return (
    <WalletList>
      <div className="flex flex-col p-2 md:p-4 justify-center md:w-full items-center">
        <span className="flex flex-col md:flex-row text-xs gap-2 lg:text-sm font-bold items-center">
          <Wallet className="text-slate-400" />
          {userWallet.name.toUpperCase()}
        </span>
        <span className="text-sm opacity-50">Click here to switch wallet</span>
      </div>
    </WalletList>
  );
}
