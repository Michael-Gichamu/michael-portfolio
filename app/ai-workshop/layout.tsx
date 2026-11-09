import type { Metadata } from 'next';
import '../../components/ai-workshop/styles/tokens.css';
import '../../components/ai-workshop/styles/base.css';
import '../../components/ai-workshop/styles/hero.css';
import '../../components/ai-workshop/styles/content.css';
import '../../components/ai-workshop/styles/closing.css';

export const metadata: Metadata = {
  title: 'AI at Work: Better Results, Better Systems, Less Manual Work — Workshop',
  description:
    'A two-day workshop on AI tools and automation. Learn how to produce high-quality work in less time, build a repeatable way of working with AI, and apply automation to save time and increase capacity.',
  openGraph: {
    title: 'AI at Work: Better Results, Better Systems, Less Manual Work',
    description:
      'A two-day workshop on AI tools and automation. 3–4 December 2026. In partnership with Alternatives Africa.',
    type: 'website',
  },
};

export default function AIWorkshopLayout({ children }: { children: React.ReactNode }) {
  return <div id="workshop-root">{children}</div>;
}
