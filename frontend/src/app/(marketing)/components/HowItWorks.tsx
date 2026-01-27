export function HowItWorks() {
    return (
        <section id="how-it-works" className="container mx-auto px-4 py-24 border-t border-border/40">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">From Idea to API in Minutes</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Forget boilerplate code. Focus on the data flow and let our engine handle the rest.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Línea conectora (solo visible en desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-muted to-muted/50 -z-10" />

                {/* STEP 1 */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <span className="text-4xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Create Project</h3>
                    <p className="text-muted-foreground px-4">
                        Define your workspace. Each project gets its own isolated virtual database and configuration environment.
                    </p>
                </div>

                {/* STEP 2 */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <span className="text-4xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Design Logic</h3>
                    <p className="text-muted-foreground px-4">
                        Use the visual builder to map endpoints. Connect <code>DB_SELECT</code> actions to standard HTTP responses.
                    </p>
                </div>

                {/* STEP 3 */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <span className="text-4xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Execute Instantly</h3>
                    <p className="text-muted-foreground px-4">
                        Use <code>/run</code> to test internally, then connect your apps via <code>/mock/:project/:path</code>. No deployments needed.
                    </p>
                </div>
            </div>
        </section>
    );
}