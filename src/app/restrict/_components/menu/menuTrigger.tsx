"use client";

import { SidebarTrigger, useSidebar } from "@/_components/ui/sidebar";

interface MenuTriggerProps {
  hidden: boolean;
}

export function MenuTrigger({ hidden }: MenuTriggerProps) {
  const { open } = useSidebar();

  return <SidebarTrigger className={`${open === hidden ? "hidden" : ""}`} />;
}
