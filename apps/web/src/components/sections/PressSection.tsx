import Link from 'next/link';
import type { PressSection as PressSectionType } from '@/lib/sanity/types';

type Props = {
  section: PressSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function PressSection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  if (!section.items || section.items.length === 0) {
    return null;
  }

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-xl opacity-80">{section.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {section.items.map((item, index) => (
            <div key={index} className="border border-steel-dark p-6 hover:border-gold transition-colors">
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-steel-light mb-2">{item.place}</p>
              <p className="text-sm text-steel mb-4">{item.date}</p>
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
                >
                  Подробнее
                  <span>→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
