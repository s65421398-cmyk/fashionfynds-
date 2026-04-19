export function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FashionFynds",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com"}/logo.png`,
    description: "Shop curated fashion finds from the world's best brands",
    sameAs: [
      "https://www.facebook.com/fashionfynds",
      "https://www.instagram.com/fashionfynds",
      "https://twitter.com/fashionfynds",
      "https://www.pinterest.com/fashionfynds",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-FASHION",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FashionFynds",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com"}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand: string;
    rating: number;
    reviews: number;
    inStock: boolean;
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com"}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      ...(product.originalPrice && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "FashionFynds",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com"}/logo.png`,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fashionfynds.com",
    telephone: "+1-800-FASHION",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Fashion Avenue",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
