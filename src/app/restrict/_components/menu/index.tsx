"use client";

import {
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/_components/ui/sidebar";
import { Banknote, BarChart, Home, List, Target } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar();
  const route = useRouter();

  function handleMenuButton(url: string) {
    route.push(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="relative min-h-min h-full justify-center"
    >
      {((isMobile && !openMobile) || (!isMobile && !open)) && (
        <SidebarTrigger className="w-full" />
      )}
      <SidebarGroupContent>
        <div className="flex flex-row px-2 w-full">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => handleMenuButton(item.url)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {!isMobile && open && <SidebarTrigger />}
        </div>
      </SidebarGroupContent>
    </Sidebar>
  );
}
