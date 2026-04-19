export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  logo: string;           // hero / card image
  coverImage: string;     // wide banner image
  category: string[];
  rating: number;
  reviewCount: number;
  founded: string;
  country: string;
  instagram?: string;
  highlights: string[];   // 3–4 short product highlights
  featured: boolean;
}

export const brands: Brand[] = [
  {
    slug: "nike",
    name: "Nike",
    tagline: "Just Do It",
    description:
      "Nike is the world's leading sportswear brand, fusing performance engineering with street-ready style. From running and training to lifestyle and fashion collaborations, Nike pushes the boundaries of what's possible.",
    website: "https://www.nike.com",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&q=80",
    category: ["Sportswear", "Sneakers", "Activewear"],
    rating: 4.8,
    reviewCount: 24300,
    founded: "1964",
    country: "USA",
    instagram: "https://www.instagram.com/nike",
    highlights: ["Air Max Collection", "Dri-FIT Technology", "Jordan Brand", "Nike Run Club"],
    featured: true,
  },
  {
    slug: "adidas",
    name: "Adidas",
    tagline: "Impossible Is Nothing",
    description:
      "Adidas blends German engineering with global street culture. From Ultraboost running shoes to Originals classics, Adidas creates gear for athletes and style icons alike.",
    website: "https://www.adidas.com",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=1200&q=80",
    category: ["Sportswear", "Sneakers", "Streetwear"],
    rating: 4.7,
    reviewCount: 19800,
    founded: "1949",
    country: "Germany",
    instagram: "https://www.instagram.com/adidas",
    highlights: ["Ultraboost Running", "Stan Smith Classics", "Yeezy Collaboration", "3-Stripes Heritage"],
    featured: true,
  },
  {
    slug: "zara",
    name: "Zara",
    tagline: "Love Your Style",
    description:
      "Zara is Inditex's flagship brand and the world's largest fast-fashion retailer, delivering runway-inspired trends to every wardrobe within weeks. Sharp tailoring, bold prints, and impeccable fits at accessible prices.",
    website: "https://www.zara.com",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
    category: ["Women", "Men", "Kids", "Contemporary"],
    rating: 4.5,
    reviewCount: 31200,
    founded: "1975",
    country: "Spain",
    instagram: "https://www.instagram.com/zara",
    highlights: ["Limited Edition Drops", "Studio Collection", "TRF Youth Line", "SRPLS Basics"],
    featured: true,
  },
  {
    slug: "hm",
    name: "H&M",
    tagline: "Fashion & Quality at the Best Price",
    description:
      "H&M democratises fashion with trend-led pieces, conscious collections, and everyday wardrobe essentials. Over 5,000 stores worldwide and a growing circular-fashion commitment.",
    website: "https://www.hm.com",
    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    category: ["Women", "Men", "Kids", "Home"],
    rating: 4.3,
    reviewCount: 28700,
    founded: "1947",
    country: "Sweden",
    instagram: "https://www.instagram.com/hm",
    highlights: ["Conscious Collection", "Studio Collab Series", "Move Activewear", "Divided Street Style"],
    featured: true,
  },
  {
    slug: "levis",
    name: "Levi's",
    tagline: "Original Since 1873",
    description:
      "Levi Strauss & Co. invented the blue jean and has been redefining denim culture for over 150 years. From classic 501s to modern tapered fits, Levi's is synonymous with authentic American style.",
    website: "https://www.levi.com",
    logo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80",
    category: ["Denim", "Casual", "Unisex"],
    rating: 4.6,
    reviewCount: 17400,
    founded: "1853",
    country: "USA",
    instagram: "https://www.instagram.com/levis",
    highlights: ["501 Original Jeans", "Trucker Jacket", "Ribcage Wide Leg", "WellThread Sustainable Line"],
    featured: true,
  },
  {
    slug: "gucci",
    name: "Gucci",
    tagline: "Luxury, Craftsmanship & Eccentricity",
    description:
      "Gucci is Florence's most iconic luxury house, celebrated for maximalist design, heritage craftsmanship, and bold cultural storytelling under Creative Director Sabato De Sarno.",
    website: "https://www.gucci.com",
    logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
    category: ["Luxury", "Women", "Men", "Accessories"],
    rating: 4.9,
    reviewCount: 8900,
    founded: "1921",
    country: "Italy",
    instagram: "https://www.instagram.com/gucci",
    highlights: ["GG Canvas Bags", "Horsebit Loafers", "Flora Fragrance", "Bamboo Handle Collection"],
    featured: true,
  },
  {
    slug: "puma",
    name: "Puma",
    tagline: "Forever Faster",
    description:
      "Puma sits at the intersection of sport, culture, and fashion. With partnerships spanning Formula 1, the NBA, and top global artists, Puma consistently delivers performance with attitude.",
    website: "https://www.puma.com",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1556048219-bb6978360b84?w=1200&q=80",
    category: ["Sportswear", "Sneakers", "Streetwear"],
    rating: 4.5,
    reviewCount: 12300,
    founded: "1948",
    country: "Germany",
    instagram: "https://www.instagram.com/puma",
    highlights: ["Suede Classic Sneakers", "NITRO Running", "RS-X Bold", "Palermo Retro"],
    featured: false,
  },
  {
    slug: "uniqlo",
    name: "Uniqlo",
    tagline: "LifeWear — Made for All",
    description:
      "Uniqlo elevates everyday essentials with Japanese precision and innovative fabrics like HEATTECH, AIRism, and Ultra Light Down. Minimalist design, maximum comfort.",
    website: "https://www.uniqlo.com",
    logo: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
    category: ["Basics", "Unisex", "Smart Casual"],
    rating: 4.7,
    reviewCount: 22100,
    founded: "1984",
    country: "Japan",
    instagram: "https://www.instagram.com/uniqlo",
    highlights: ["HEATTECH Innerwear", "Ultra Light Down Jacket", "AIRism Seamless", "Kando Pants"],
    featured: false,
  },
  {
    slug: "ralph-lauren",
    name: "Ralph Lauren",
    tagline: "The Dream of a Better America",
    description:
      "Ralph Lauren defines American luxury — from the iconic Polo shirt and prep-school aesthetics to Ralph's Collection for the global elite. Timeless elegance across seven decades.",
    website: "https://www.ralphlauren.com",
    logo: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=1200&q=80",
    category: ["Luxury", "Preppy", "Casual", "Formal"],
    rating: 4.7,
    reviewCount: 9400,
    founded: "1967",
    country: "USA",
    instagram: "https://www.instagram.com/ralphlauren",
    highlights: ["Polo Classic Shirts", "Purple Label Suits", "Big Pony Fragrance", "Rugby Heritage"],
    featured: false,
  },
  {
    slug: "calvin-klein",
    name: "Calvin Klein",
    tagline: "Between Love and Madness Lies Obsession",
    description:
      "Calvin Klein is the minimalist icon of American fashion — effortlessly clean silhouettes, provocative campaigns, and underwear that became a cultural phenomenon.",
    website: "https://www.calvinklein.com",
    logo: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
    category: ["Casual", "Denim", "Underwear", "Fragrance"],
    rating: 4.5,
    reviewCount: 15800,
    founded: "1968",
    country: "USA",
    instagram: "https://www.instagram.com/calvinklein",
    highlights: ["CK1 Underwear", "205W39NYC Capsule", "Obsession Fragrance", "Slim-Fit Jeans"],
    featured: false,
  },
  {
    slug: "tommy-hilfiger",
    name: "Tommy Hilfiger",
    tagline: "The Essence of American Cool",
    description:
      "Tommy Hilfiger fuses classic American sportswear with a preppy, nautical DNA. Iconic red-white-and-blue branding, Tommy Jeans streetwear, and adaptive fashion lead the charge.",
    website: "https://www.tommyhilfiger.com",
    logo: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80",
    category: ["Preppy", "Casual", "Denim", "Sportswear"],
    rating: 4.4,
    reviewCount: 11200,
    founded: "1985",
    country: "USA",
    instagram: "https://www.instagram.com/tommyhilfiger",
    highlights: ["Tommy Jeans Streetwear", "Flag Logo Classics", "Adaptive Collection", "Hilfiger Collection"],
    featured: false,
  },
  {
    slug: "mango",
    name: "Mango",
    tagline: "Mediterranean Fashion for Modern Women",
    description:
      "Mango channels Barcelona's cosmopolitan energy into beautifully crafted contemporary fashion. Sophisticated yet wearable — perfect for the modern professional woman.",
    website: "https://www.mango.com",
    logo: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
    category: ["Women", "Contemporary", "Business Casual"],
    rating: 4.4,
    reviewCount: 14600,
    founded: "1984",
    country: "Spain",
    instagram: "https://www.instagram.com/mango",
    highlights: ["MANGO Committed Eco", "MNG by Mango", "Suit Collection", "Violeta Plus Size"],
    featured: false,
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export const featuredBrands = brands.filter((b) => b.featured);
export const categories = [...new Set(brands.flatMap((b) => b.category))].sort();
