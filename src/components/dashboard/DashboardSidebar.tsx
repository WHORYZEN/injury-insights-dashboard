
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  SidebarFooter,
  useSidebar
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
  LogOut,
  Calculator,
  FileLock2,
  Contact,
  MessageSquare,
  Folder
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/components/AuthProvider";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Cases", icon: FileText, path: "/cases" },
  { name: "Contacts", icon: Contact, path: "/contacts" },
  { name: "Communications", icon: MessageSquare, path: "/communications" },
  { name: "Documents", icon: Folder, path: "/documents" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  { name: "Time Tracking", icon: Clock, path: "/time" },
  { name: "Tasks", icon: CheckSquare, path: "/tasks" },
  { name: "Billing", icon: DollarSign, path: "/billing" },
  { name: "Settlement Calculator", icon: Calculator, path: "/settlement-calculator" },
  { name: "LOP Tracking", icon: FileLock2, path: "/lop-tracking" },
  { name: "Reports", icon: BarChart4, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
              PI
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">PI-360°</span>
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
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-2 py-2 ${location.pathname === item.path ? 'text-primary font-medium' : ''}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <button 
            className="flex items-center gap-2 text-sidebar-foreground w-full"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
