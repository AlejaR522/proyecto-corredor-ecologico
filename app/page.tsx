import {
  About,
  Benefits,
  CTASection,
  Footer,
  Header,
  Hero,
  Stats,
} from "@/components/landing";
import { serverSession } from "@/lib/auth-server";

export default async function LandingPage() {
  const data = await serverSession()
  const hasSession = Boolean(data?.session)

  console.log(hasSession)

  return (
    <div className="min-h-screen bg-stone-50">
      <Header hasSession={hasSession} />
      <Hero />
      <Stats />
      <About />
      <Benefits />
      <CTASection />
      <Footer />
    </div>
  );
}
