import { db } from '@/db';
import { brands } from '@/db/schema';

async function main() {
    const sampleBrands = [
        {
            name: 'Nike',
            slug: 'nike',
            description: 'Just Do It',
            logo: '/images/brands/nike.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Adidas',
            slug: 'adidas',
            description: 'Impossible is Nothing',
            logo: '/images/brands/adidas.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Zara',
            slug: 'zara',
            description: 'Fast fashion from Spain',
            logo: '/images/brands/zara.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'H&M',
            slug: 'h-m',
            description: 'Fashion and quality at the best price',
            logo: '/images/brands/hm.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Gucci',
            slug: 'gucci',
            description: 'Luxury Italian fashion',
            logo: '/images/brands/gucci.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Prada',
            slug: 'prada',
            description: 'Italian luxury fashion house',
            logo: '/images/brands/prada.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: "Levi's",
            slug: 'levis',
            description: 'Original jeans since 1873',
            logo: '/images/brands/levis.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Gap',
            slug: 'gap',
            description: 'American casual wear',
            logo: '/images/brands/gap.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Uniqlo',
            slug: 'uniqlo',
            description: 'Japanese casual wear',
            logo: '/images/brands/uniqlo.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Forever 21',
            slug: 'forever-21',
            description: 'Fast fashion for young adults',
            logo: '/images/brands/forever21.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Urban Rebel',
            slug: 'urban-rebel',
            description: 'Street style meets comfort',
            logo: '/images/brands/urban-rebel.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Vintage Revival',
            slug: 'vintage-revival',
            description: 'Bringing back classic styles',
            logo: '/images/brands/vintage-revival.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Wild Heart',
            slug: 'wild-heart',
            description: 'Free-spirited fashion',
            logo: '/images/brands/wild-heart.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Minimalist Studio',
            slug: 'minimalist-studio',
            description: 'Less is more',
            logo: '/images/brands/minimalist-studio.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Eco Threads',
            slug: 'eco-threads',
            description: 'Sustainable fashion for a better world',
            logo: '/images/brands/eco-threads.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Local Makers',
            slug: 'local-makers',
            description: 'Supporting local artisans',
            logo: '/images/brands/local-makers.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Fair Trade Co',
            slug: 'fair-trade-co',
            description: 'Ethical fashion choices',
            logo: '/images/brands/fair-trade-co.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Mango',
            slug: 'mango',
            description: 'Mediterranean fashion',
            logo: '/images/brands/mango.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Pull&Bear',
            slug: 'pull-bear',
            description: 'Young and urban fashion',
            logo: '/images/brands/pullbear.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Bershka',
            slug: 'bershka',
            description: 'Trendy fashion for the young',
            logo: '/images/brands/bershka.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Massimo Dutti',
            slug: 'massimo-dutti',
            description: 'Elegant urban fashion',
            logo: '/images/brands/massimo-dutti.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'COS',
            slug: 'cos',
            description: 'Contemporary fashion',
            logo: '/images/brands/cos.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: '& Other Stories',
            slug: 'and-other-stories',
            description: 'Personal style collective',
            logo: '/images/brands/other-stories.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Weekday',
            slug: 'weekday',
            description: 'Denim and new basics',
            logo: '/images/brands/weekday.png',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Monki',
            slug: 'monki',
            description: 'Fun and creative fashion',
            logo: '/images/brands/monki.png',
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(brands).values(sampleBrands);
    
    console.log('✅ Brands seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});