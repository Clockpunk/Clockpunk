import Image from 'next/image';
import Link from 'next/link';
import type { HeroSection as HeroSectionType } from '@/lib/sanity/types';
import { urlForImage } from '@/lib/sanity/image';

type Props = {
  section: HeroSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function HeroSection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  return (
    <section id={id} className={`relative min-h-screen flex items-center justify-center ${bgClass}`}>
      {/* Background Media */}
      {section.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(section.backgroundImage).width(1920).height(1080).url()}
            alt={section.backgroundImage.alt || ''}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}

      {section.videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        >
          <source src={section.videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          {section.headline}
        </h1>

        {section.subheadline && (
          <p className="text-xl md:text-2xl mb-12 text-balance max-w-2xl mx-auto opacity-90">
            {section.subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {section.primaryCta && (
            <Link
              href={section.primaryCta.href}
              className="px-8 py-4 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
            >
              {section.primaryCta.label}
            </Link>
          )}

          {section.secondaryCta && (
            <Link
              href={section.secondaryCta.href}
              className="px-8 py-4 border border-current rounded-sm hover:bg-white/10 transition-colors"
            >
              {section.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
