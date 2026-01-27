import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-6 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="font-bold text-xl tracking-tight">DynamicEngine</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">Login</Button>
                <Button size="sm">Get Started</Button>
            </div>
        </nav>
    );
}