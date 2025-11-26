'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BotMessageSquare, BookHeart, ClipboardCheck, Wind, ListMusic, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../theme-toggle';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat', icon: BotMessageSquare, label: 'Chat' },
  { href: '/journal', icon: BookHeart, label: 'Journal' },
  { href: '/habits', icon: ClipboardCheck, label: 'Habits' },
  { href: '/breathing', icon: Wind, label: 'Breathing' },
  { href: '/playlists', icon: ListMusic, label: 'Playlists' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('ceevi-user');
    router.push('/login');
  };

  return (
    <Sidebar className="border-r border-white/10 bg-card/30 backdrop-blur-xl" collapsible="icon">
        <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <Sparkles className="w-8 h-8 text-primary group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6 transition-all" />
                <h1 className="text-4xl font-headline font-bold text-primary-foreground group-data-[collapsible=icon]:hidden">Ceevi</h1>
            </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarMenu>
                {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={{ children: item.label, className: 'bg-card/80 backdrop-blur-md' }}
                        className={cn(
                          "data-[active=true]:bg-primary/20 data-[active=true]:text-primary-foreground hover:bg-primary/10",
                          "group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12"
                        )}
                    >
                        <Link href={item.href}>
                            <item.icon className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-2">
            <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
                <ThemeToggle />
                <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </Button>
            </div>
            <Separator className="my-2 bg-white/10" />
            <p className="text-xs text-muted-foreground mt-4 group-data-[collapsible=icon]:hidden">© 2024 Ceevi</p>
        </SidebarFooter>
    </Sidebar>
  );
}
