import { Nav } from '@/components/ai-workshop/Nav';
import Hero from '@/components/ai-workshop/Hero';
import { Philosophy } from '@/components/ai-workshop/Philosophy';
import { Gain } from '@/components/ai-workshop/Gain';
import { Curriculum } from '@/components/ai-workshop/Curriculum';
import { Takeaways } from '@/components/ai-workshop/Takeaways';
import { Audience } from '@/components/ai-workshop/Audience';
import { Facilitator } from '@/components/ai-workshop/Facilitator';
import { Details } from '@/components/ai-workshop/Details';
import { Faq } from '@/components/ai-workshop/Faq';
import { FinalCta, Footer } from '@/components/ai-workshop/FinalCta';

export default function AIWorkshopPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <Gain />
        <Curriculum />
        <Takeaways />
        <Audience />
        <Facilitator />
        <Details />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}