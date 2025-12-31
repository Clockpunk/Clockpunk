import Link from 'next/link';
import type { CtaSection as CtaSectionType } from '@/lib/sanity/types';

type Props = {
  section: CtaSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function CtaSection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">{section.title}</h2>
          {section.text && <p className="text-xl md:text-2xl mb-12 opacity-90">{section.text}</p>}
          <Link
            href={section.cta.href}
            className="inline-block px-12 py-5 bg-gold text-black font-semibold text-lg rounded-sm hover:bg-gold-light transition-colors"
          >
            {section.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
