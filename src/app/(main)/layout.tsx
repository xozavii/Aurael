import AppSidebar from '@/components/layout/sidebar';
import MobileHeader from '@/components/layout/mobile-header';
import MusicPlayer from '@/components/layout/music-player';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <MobileHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
      <MusicPlayer />
    </SidebarProvider>
  );
}
