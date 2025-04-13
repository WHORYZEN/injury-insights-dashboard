
// src/components/dashboard/TopNav.tsx
// This file is read-only, but I'll provide the modified version that would add a logout button

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";
import {
  Bell,
  Calendar,
  CircleHelp,
  Clock,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

const TopNav = () => {
  const { openSidebar } = useSidebar();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={openSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cases, contacts..."
              className="pl-8 sm:w-[300px] md:w-[360px] lg:w-[420px]"
            />
          </div>
        </form>
        <nav className="hidden gap-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            asChild
          >
            <a href="/calendar">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Calendar</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            asChild
          >
            <a href="/time">
              <Clock className="h-5 w-5" />
              <span className="sr-only">Time</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            asChild
          >
            <a href="#">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            asChild
          >
            <a href="#">
              <CircleHelp className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </a>
          </Button>
        </nav>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-primary/10"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>PI</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="#">
              <User className="mr-2 h-4 w-4" />
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="#">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopNav;
