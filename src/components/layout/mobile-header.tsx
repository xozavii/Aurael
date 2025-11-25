import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sparkles } from "lucide-react";

export default function MobileHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b border-white/10 bg-transparent px-4 lg:hidden sticky top-0 z-20 backdrop-blur-md">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h1 className="text-3xl font-headline font-bold text-primary-foreground">Aurael</h1>
            </div>
        </header>
    );
}
