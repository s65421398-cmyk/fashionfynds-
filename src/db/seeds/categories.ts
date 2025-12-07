import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Women',
            slug: 'women',
            description: "Shop the latest women's fashion trends",
            image: '/images/categories/women.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Men',
            slug: 'men',
            description: "Discover men's clothing and accessories",
            image: '/images/categories/men.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Kids',
            slug: 'kids',
            description: 'Fashion for children of all ages',
            image: '/images/categories/kids.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Shoes',
            slug: 'shoes',
            description: 'Step up your style with our shoe collection',
            image: '/images/categories/shoes.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Bags',
            slug: 'bags',
            description: 'Carry your essentials in style',
            image: '/images/categories/bags.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Accessories',
            slug: 'accessories',
            description: 'Complete your look with accessories',
            image: '/images/categories/accessories.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Jewelry',
            slug: 'jewelry',
            description: 'Shine bright with our jewelry selection',
            image: '/images/categories/jewelry.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Beauty',
            slug: 'beauty',
            description: 'Beauty products and cosmetics',
            image: '/images/categories/beauty.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Activewear',
            slug: 'activewear',
            description: 'Performance and style for active lifestyles',
            image: '/images/categories/activewear.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Vintage',
            slug: 'vintage',
            description: 'Timeless vintage pieces',
            image: '/images/categories/vintage.jpg',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Sustainable',
            slug: 'sustainable',
            description: 'Eco-friendly and sustainable fashion',
            image: '/images/categories/sustainable.jpg',
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});