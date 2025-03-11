"use client";

import {
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/_components/ui/sidebar";
import { Banknote, BarChart, Home, List, Target } from "lucide-react";
import { useRouter } from "next/navigation";
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
      icon: Banknote,
    },
    {
      title: "Transactions",
      url: "/restrict/transactions",
      icon: List,
    },
    {
      title: "Analysis",
      url: "/restrict/analysis",
      icon: BarChart,
    },
    {
      title: "Goals",
      url: "/restrict/goals",
      icon: Target,
    },
  ];
  const { isMobile, setOpenMobile } = useSidebar();
  const route = useRouter();

  function handleMenuButton(url: string) {
    route.push(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar collapsible="icon" className="relative min-h-min h-full">
      <SidebarGroupContent>
        <div className="flex flex-row px-2">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton onClick={() => handleMenuButton(item.url)}>
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
