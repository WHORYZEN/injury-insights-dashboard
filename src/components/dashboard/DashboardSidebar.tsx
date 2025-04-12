
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Clock, 
  CheckSquare, 
  DollarSign, 
  Settings,
  BarChart4,
  LogOut
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Cases", icon: FileText, path: "/cases" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  { name: "Time Tracking", icon: Clock, path: "/time" },
  { name: "Tasks", icon: CheckSquare, path: "/tasks" },
  { name: "Billing", icon: DollarSign, path: "/billing" },
  { name: "Reports", icon: BarChart4, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const DashboardSidebar = () => {
  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
              PI
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">InjuryCase</span>
          </div>
          <SidebarTrigger className="absolute right-2 top-4 text-sidebar-foreground" />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.path} 
                        className="flex items-center gap-2 py-2"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <button className="flex items-center gap-2 text-sidebar-foreground w-full">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
