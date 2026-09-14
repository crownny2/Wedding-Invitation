import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Details from "@/components/Details";
import Entourage from "@/components/Entourage";
import Gift from "@/components/Gift";
import RSVPSection from "@/components/RSVP/RSVPSection";
import FloatingRSVPButton from "@/components/RSVP/FloatingRSVPButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Details />
      <Entourage />
      <Gift />
      <RSVPSection />
      <Footer />
      <FloatingRSVPButton />
    </main>
  );
}
