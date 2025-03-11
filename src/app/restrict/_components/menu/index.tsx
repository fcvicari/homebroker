"use client";

import {
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { MenuTrigger } from "./menuTrigger";

export function MenuApp() {
  const items = [
    {
      title: "Dashboard",
      url: "/restrict",
      icon: Home,
    },
    {
      title: "Dividends",
      url: "/restrict/dividends",
      icon: Inbox,
    },
    {
      title: "Transactions",
      url: "/restrict/transactions",
      icon: Calendar,
    },
    {
      title: "Analysis",
      url: "/restrict/analysis",
      icon: Search,
    },
    {
      title: "Goals",
      url: "/restrict/goals",
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="relative min-h-min h-full">
      <SidebarGroupContent>
        <div className="flex flex-row px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => alert("clicou na carteira")}>
                <Wallet />
                <span>Carteira</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <MenuTrigger hidden={false} />
        </div>
      </SidebarGroupContent>
    </Sidebar>
  );
}
