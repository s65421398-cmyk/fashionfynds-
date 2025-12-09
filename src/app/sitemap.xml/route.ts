import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products, categories, brands, blogPosts } from '@/db/schema';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fashionfynds.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const [allProducts, allCategories, allBrands, allBlogPosts] = await Promise.all([
    db.select({ slug: products.slug, updatedAt: products.updatedAt }).from(products),
    db.select({ slug: categories.slug }).from(categories),
    db.select({ slug: brands.slug }).from(brands),
    db.select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt }).from(blogPosts),
  ]);

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/deals', priority: '0.9', changefreq: 'daily' },
    { url: '/collections', priority: '0.8', changefreq: 'weekly' },
    { url: '/explore-brands', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.7', changefreq: 'daily' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq', priority: '0.5', changefreq: 'monthly' },
    { url: '/shipping', priority: '0.5', changefreq: 'monthly' },
    { url: '/terms', priority: '0.4', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  for (const product of allProducts) {
    xml += `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${product.updatedAt?.split('T')[0] || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  for (const category of allCategories) {
    xml += `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  for (const brand of allBrands) {
    xml += `
  <url>
    <loc>${baseUrl}/brands/${brand.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  for (const post of allBlogPosts) {
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt?.split('T')[0] || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
