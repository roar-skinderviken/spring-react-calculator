import Hero from "@/components/Hero"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Signed out | VICX"
}

export default async function DashboardPage() {
    return (
        <main className="content">
            <Hero
                title="Signed Out"
                lead="You have successfully signed out."
            />

            <div className="container mx-auto my-8">
                <h2 className="text-center text-3xl font-bold my-4">You&apos;re signed out!</h2>
                <p className="text-center text-lg my-2">We&apos;re glad to have you back whenever you&apos;re ready.</p>
                <p className="text-center"><Link href="/" className="text-blue-600 hover:underline">Return to Homepage</Link></p>
            </div>
        </main>
    )
}