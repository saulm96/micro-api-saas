import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";

export default function LandingPage() {
    return (
        <div className="pb-20">
            <Hero />
            <Features />
            <HowItWorks />
        </div>
    );
}