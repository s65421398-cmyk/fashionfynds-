import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Sneakers",
    brand: "Nike",
    price: 7499,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80"
    ],
    category: "Shoes",
    description: "Timeless white sneakers perfect for any casual outfit. Comfortable and stylish.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray"],
    rating: 4.5,
    reviews: 234,
    inStock: true,
    featured: true,
    deal: true,
    movement: "Urban Explorer"
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    brand: "Coach",
    price: 18999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    category: "Bags",
    description: "Premium leather crossbody bag with adjustable strap. Perfect for everyday use.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    movement: "Minimalist"
  },
  {
    id: "3",
    name: "Oversized Denim Jacket",
    brand: "Levi's",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    category: "Outerwear",
    description: "Classic oversized denim jacket with vintage wash. A wardrobe staple.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    deal: true,
    movement: "Vintage Vibes"
  },
  {
    id: "4",
    name: "Silk Slip Dress",
    brand: "Reformation",
    price: 8999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    category: "Dresses",
    description: "Elegant silk slip dress perfect for evening wear. Luxurious and comfortable.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Champagne", "Emerald"],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    featured: true,
    movement: "Elegant Evening"
  },
  {
    id: "5",
    name: "High-Waist Yoga Leggings",
    brand: "Lululemon",
    price: 4999,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    category: "Activewear",
    description: "Premium yoga leggings with moisture-wicking fabric. Perfect for workouts.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    rating: 4.7,
    reviews: 412,
    inStock: true,
    movement: "Active Lifestyle"
  },
  {
    id: "6",
    name: "Minimalist Watch",
    brand: "Daniel Wellington",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    category: "Accessories",
    description: "Elegant minimalist watch with leather strap. Timeless design.",
    sizes: ["One Size"],
    colors: ["Silver", "Gold", "Rose Gold"],
    rating: 4.4,
    reviews: 267,
    inStock: true,
    deal: true,
    movement: "Minimalist"
  },
  {
    id: "7",
    name: "Cashmere Sweater",
    brand: "Everlane",
    price: 6999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    category: "Tops",
    description: "Luxurious cashmere sweater. Soft, warm, and perfect for layering.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Gray", "Navy"],
    rating: 4.8,
    reviews: 143,
    inStock: true,
    featured: true,
    movement: "Cozy Comfort"
  },
  {
    id: "8",
    name: "Wide Leg Trousers",
    brand: "Zara",
    price: 2999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    category: "Bottoms",
    description: "Trendy wide leg trousers with high waist. Modern and comfortable.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Olive"],
    rating: 4.3,
    reviews: 178,
    inStock: true,
    movement: "Urban Explorer"
  },
  {
    id: "9",
    name: "Leather Ankle Boots",
    brand: "Dr. Martens",
    price: 12999,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    category: "Shoes",
    description: "Classic leather ankle boots. Durable and stylish for all seasons.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Brown", "Cherry Red"],
    rating: 4.7,
    reviews: 321,
    inStock: true,
    movement: "Vintage Vibes"
  },
  {
    id: "10",
    name: "Aviator Sunglasses",
    brand: "Ray-Ban",
    price: 9999,
    originalPrice: 13999,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    category: "Accessories",
    description: "Classic aviator sunglasses with UV protection. Iconic style.",
    sizes: ["One Size"],
    colors: ["Black", "Gold", "Silver"],
    rating: 4.6,
    reviews: 445,
    inStock: true,
    deal: true,
    movement: "Urban Explorer"
  },
  {
    id: "11",
    name: "Linen Button-Up Shirt",
    brand: "Uniqlo",
    price: 1999,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    category: "Tops",
    description: "Breathable linen shirt perfect for summer. Lightweight and comfortable.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Beige"],
    rating: 4.4,
    reviews: 267,
    inStock: true,
    movement: "Minimalist"
  },
  {
    id: "12",
    name: "Midi Skirt",
    brand: "& Other Stories",
    price: 3499,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    category: "Bottoms",
    description: "Elegant midi skirt with pleated details. Perfect for any occasion.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    rating: 4.5,
    reviews: 134,
    inStock: true,
    featured: true,
    movement: "Elegant Evening"
  }
];

export const brands = [
  { name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&q=80" },
  { name: "Zara", logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&q=80" },
  { name: "H&M", logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80" },
  { name: "Levi's", logo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80" },
  { name: "Gucci", logo: "https://images.unsplash.com/photo-1509319117893-57f03ff6906b?w=300&q=80" }
];

export const collections = [
  {
    id: "summer",
    name: "Summer Essentials",
    description: "Light and breezy pieces for warm weather",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
  },
  {
    id: "workwear",
    name: "Office Ready",
    description: "Professional looks for the workplace",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "athleisure",
    name: "Athleisure",
    description: "Comfort meets style",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80"
  },
  {
    id: "evening",
    name: "Evening Wear",
    description: "Elegant pieces for special occasions",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
  }
];

export const movements = [
  {
    id: "urban-explorer",
    name: "Urban Explorer",
    description: "Street style meets functionality",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Less is more",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "vintage-vibes",
    name: "Vintage Vibes",
    description: "Timeless pieces with character",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea27c9fd?w=800&q=80"
  },
  {
    id: "active-lifestyle",
    name: "Active Lifestyle",
    description: "Performance meets fashion",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80"
  }
];
