import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Hero() {
    return (
        <section className="container mx-auto pt-24 px-4 text-center">
            <Badge variant="secondary" className="mb-5 py-1 px-4 text-sm rounded-full">
                🚀 MVP Live: Build APIs at Runtime
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-7 pb-2 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                The API engine that <br /> lives in your database.
            </h1>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto mb-10">
                Define endpoints, logic, and persistence without writing a single line of backend code.
                Deploy instantly with our <strong>Dynamic Runtime Engine</strong>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-lg" asChild>
                    <Link href="/projects">Start Building Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                    Read the Manifest
                </Button>
            </div>

            {/* MOCKUP DE CÓDIGO/API */}
            <div className="mt-16 max-w-4xl mx-auto">
                <Card className="bg-zinc-950 text-zinc-300 p-6 rounded-xl border-zinc-800 shadow-2xl overflow-hidden text-left font-mono text-sm">
                    <div className="flex gap-2 mb-4 border-b border-zinc-800 pb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="ml-2 text-xs text-zinc-500">GET /run/project-123/users</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-blue-400">{"{"}</p>
                        <p className="ml-4 tracking-wide italic text-zinc-500">// Engine resolves this in real-time</p>
                        <p className="ml-4"><span className="text-zinc-400">"status":</span> <span className="text-green-400">200</span>,</p>
                        <p className="ml-4"><span className="text-zinc-400">"data":</span> [</p>
                        <p className="ml-8">{"{ "}<span className="text-zinc-400">"id"</span>: 1, <span className="text-zinc-400">"name"</span>: "Dynamic User" {"}"}</p>
                        <p className="ml-4">]</p>
                        <p className="text-blue-400">{"}"}</p>
                    </div>
                </Card>
            </div>
        </section>
    );
}