"use client";

import {
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings, Wallet } from "lucide-react";
import { MenuTrigger } from "./menuTrigger";

export function MenuApp() {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
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
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.title}</span>
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
