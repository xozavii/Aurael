import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuraelWaveIcon } from "../icons/aurael-wave-icon";

export default function MobileHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b border-white/10 bg-transparent px-4 lg:hidden sticky top-0 z-20 backdrop-blur-md">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
                <AuraelWaveIcon className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-headline font-bold text-primary">Aurael</h1>
            </div>
        </header>
    );
}
