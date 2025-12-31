import { groq } from 'next-sanity';

// Fragments
const imageFragment = groq`
  asset,
  alt,
  caption
`;

const artworkCardFragment = groq`
  _id,
  _type,
  title,
  "slug": slug.current,
  status,
  year,
  coverImage {
    ${imageFragment}
  },
  featured,
  sortOrder
`;

const artworkDetailFragment = groq`
  ${artworkCardFragment},
  medium,
  dimensions,
  description,
  price,
  currency,
  priceOnRequest,
  images[] {
    ${imageFragment}
  },
  tags,
  seo
`;

// Home Page Query
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    title,
    sections[] {
      _type,
      _key,
      enabled,
      id,
      theme,
      
      // Hero Section
      _type == "heroSection" => {
        headline,
        subheadline,
        backgroundImage {
          ${imageFragment}
        },
        videoUrl,
        primaryCta,
        secondaryCta
      },
      
      // Featured Artworks Section
      _type == "featuredArtworksSection" => {
        title,
        subtitle,
        autoFeatured,
        showCount,
        autoFeatured == false => {
          "items": items[]-> {
            ${artworkCardFragment}
          }
        },
        autoFeatured == true => {
          "items": *[_type == "artwork" && featured == true && status in ["available", "sold"]] | order(sortOrder asc, year desc, title asc) [0...^.showCount] {
            ${artworkCardFragment}
          }
        }
      },
      
      // Gallery Grid Section
      _type == "galleryGridSection" => {
        title,
        subtitle,
        "artworks": artworks[]-> {
          ${artworkCardFragment}
        }
      },
      
      // Brand Story Section
      _type == "brandStorySection" => {
        title,
        body,
        image {
          ${imageFragment}
        }
      },
      
      // Process Section
      _type == "processSection" => {
        title,
        subtitle,
        items[] {
          title,
          text,
          icon
        }
      },
      
      // Press Section
      _type == "pressSection" => {
        title,
        subtitle,
        items[] {
          title,
          place,
          date,
          link
        }
      },
      
      // CTA Section
      _type == "ctaSection" => {
        title,
        text,
        cta
      }
    }
  }
`;

// Page Query
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    seo,
    sections[] {
      _type,
      _key,
      enabled,
      id,
      theme,
      
      // All section types similar to home page
      _type == "heroSection" => {
        headline,
        subheadline,
        backgroundImage {
          ${imageFragment}
        },
        videoUrl,
        primaryCta,
        secondaryCta
      },
      
      _type == "featuredArtworksSection" => {
        title,
        subtitle,
        autoFeatured,
        showCount,
        autoFeatured == false => {
          "items": items[]-> {
            ${artworkCardFragment}
          }
        },
        autoFeatured == true => {
          "items": *[_type == "artwork" && featured == true && status in ["available", "sold"]] | order(sortOrder asc, year desc, title asc) [0...^.showCount] {
            ${artworkCardFragment}
          }
        }
      },
      
      _type == "galleryGridSection" => {
        title,
        subtitle,
        "artworks": artworks[]-> {
          ${artworkCardFragment}
        }
      },
      
      _type == "brandStorySection" => {
        title,
        body,
        image {
          ${imageFragment}
        }
      },
      
      _type == "processSection" => {
        title,
        subtitle,
        items
      },
      
      _type == "pressSection" => {
        title,
        subtitle,
        items
      },
      
      _type == "ctaSection" => {
        title,
        text,
        cta
      }
    }
  }
`;

// Artworks List Query
export const artworksListQuery = groq`
  *[_type == "artwork" && status in ["available", "sold"]] | order(featured desc, sortOrder asc, year desc, title asc) {
    ${artworkCardFragment}
  }
`;

// Artwork Detail Query
export const artworkDetailQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    ${artworkDetailFragment}
  }
`;

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    ogImage {
      ${imageFragment}
    },
    logo {
      ${imageFragment}
    },
    socials,
    contacts,
    seoDefaults
  }
`;

// All Artworks Slugs Query (for sitemap)
export const artworkSlugsQuery = groq`
  *[_type == "artwork" && defined(slug.current) && status in ["available", "sold"]] {
    "slug": slug.current
  }
`;

// All Pages Slugs Query (for sitemap)
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current
  }
`;
