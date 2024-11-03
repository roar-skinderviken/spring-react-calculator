import Hero from "@/components/Hero"
import Dashboard from "@/components/Dashboard"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Dashboard | VICX"
}

export default async function DashboardPage() {
    return (
        <main className="content">
            <Hero
                title="Dashboard"
                lead="This is your future dashboard"
            />

            <div className="container mx-auto my-5">
                <Dashboard/>
            </div>
        </main>
    )
}
