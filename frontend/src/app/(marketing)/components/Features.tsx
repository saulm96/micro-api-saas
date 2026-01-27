import { Card } from "@/components/ui/card";
import { Cpu, Database, Zap } from "lucide-react";

export function Features() {
    return (
        <section id="features" className="container mx-auto px-4 grid md:grid-cols-3 gap-8 py-24">
            <FeatureCard
                icon={<Cpu className="w-6 h-6" />}
                title="Runtime Logic"
                description="Change your API logic on the fly. No recompilation, no restarts, zero downtime."
            />
            <FeatureCard
                icon={<Database className="w-6 h-6" />}
                title="Virtual JSON DB"
                description="A schema-less layer on top of MySQL. Store any structure without migrations."
            />
            <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Action System"
                description="Chain actions: Mock responses, DB inserts, and soon HTTP webhooks."
            />
        </section>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="p-6 hover:shadow-lg transition-shadow border-muted">
            <div className="mb-4 text-primary">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </Card>
    );
}