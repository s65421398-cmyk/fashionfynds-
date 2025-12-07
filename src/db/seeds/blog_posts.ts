import { db } from '@/db';
import { user, blogPosts } from '@/db/schema';

async function main() {
    // Step 1: Create test user
    const testUser = {
        id: 'test-user-123456',
        name: 'Fashion Editor',
        email: 'editor@fashionstore.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.insert(user).values(testUser);
    console.log('✅ Test user created successfully');

    // Step 2: Create blog posts
    const sampleBlogPosts = [
        {
            title: 'The Rise of Indie Fashion: Why Small Brands Are Taking Over',
            slug: 'rise-of-indie-fashion',
            category: 'Indie Brands',
            excerpt: 'Discover how independent fashion brands are revolutionizing the industry with authentic stories and unique designs that challenge mainstream fashion.',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
            readTime: '5 min read',
            featured: true,
            views: 342,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>The fashion industry is experiencing a seismic shift as independent designers and small-scale brands challenge the dominance of mainstream fashion houses. These indie brands are not just creating clothes; they're telling stories, building communities, and offering consumers something that fast fashion giants simply cannot—authenticity.</p>

                <h3>The Authenticity Factor</h3>
                <p>What sets indie fashion brands apart is their <strong>commitment to genuine storytelling</strong>. Unlike mass-market retailers, these smaller operations are often founded by passionate individuals who pour their personal narratives into every collection. Customers aren't just buying a product; they're investing in a vision, supporting a dream, and becoming part of a movement that values creativity over conformity.</p>

                <h3>Quality Over Quantity</h3>
                <p>Indie brands typically produce smaller batches with meticulous attention to detail. This approach allows for superior craftsmanship, unique designs, and often more sustainable production methods. The result is clothing that lasts longer, fits better, and carries a story worth sharing. In an era of disposable fashion, this return to quality resonates deeply with conscious consumers.</p>

                <h3>The Future is Independent</h3>
                <p>As social media continues to democratize fashion marketing and e-commerce platforms make direct-to-consumer sales easier than ever, the barriers to entry for indie brands have never been lower. This democratization is fostering innovation, diversity, and creativity in ways the industry hasn't seen in decades. The rise of indie fashion isn't just a trend—it's a fundamental reimagining of how fashion can and should work.</p>
            `,
            createdAt: new Date('2024-11-15').toISOString(),
            updatedAt: new Date('2024-11-15').toISOString(),
        },
        {
            title: 'Sustainable Fashion: More Than Just a Trend',
            slug: 'sustainable-fashion-trend',
            category: 'Sustainability',
            excerpt: 'Explore the real impact of sustainable fashion choices and how eco-conscious brands are making a difference in the industry.',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            readTime: '7 min read',
            featured: true,
            views: 478,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Sustainable fashion has evolved from a niche concern to a mainstream priority, but what does sustainability really mean in the context of clothing? It's more than just using organic cotton or recycled materials—it's a comprehensive approach to fashion that considers environmental impact, labor practices, and long-term viability at every step of the production process.</p>

                <h3>The True Cost of Fast Fashion</h3>
                <p>The fashion industry is one of the world's largest polluters, responsible for <strong>10% of global carbon emissions</strong> and massive water consumption. Fast fashion's rapid production cycles encourage overconsumption and generate tons of textile waste annually. Understanding these impacts is the first step toward making more conscious choices about what we wear and how we shop.</p>

                <h3>Sustainable Alternatives Making a Difference</h3>
                <p>Eco-conscious brands are pioneering innovative solutions: using deadstock fabrics to prevent waste, implementing circular design principles where garments can be recycled at end of life, choosing natural dyes that don't pollute waterways, and ensuring fair wages and safe working conditions throughout their supply chains. These practices prove that fashion can be both beautiful and responsible.</p>

                <h3>Your Role in the Movement</h3>
                <p>Every purchase is a vote for the kind of industry you want to support. By choosing sustainable brands, caring for your clothes to extend their lifespan, buying secondhand, and demanding transparency from fashion companies, consumers are driving real change. The sustainable fashion movement isn't about perfection—it's about progress and making better choices whenever possible.</p>

                <h3>Looking Forward</h3>
                <p>The future of fashion must be sustainable. As technology advances and consumer awareness grows, we're seeing exciting innovations in materials science, circular business models, and transparent supply chains. The brands leading this charge aren't just adapting to survive—they're thriving by aligning with the values of a new generation of conscious consumers.</p>
            `,
            createdAt: new Date('2024-11-20').toISOString(),
            updatedAt: new Date('2024-11-20').toISOString(),
        },
        {
            title: 'Winter 2025: Top 10 Street Style Trends You Need to Know',
            slug: 'winter-2025-street-style-trends',
            category: 'Trends',
            excerpt: 'From oversized coats to bold accessories, here\'s what\'s dominating street fashion this winter season.',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
            readTime: '4 min read',
            featured: false,
            views: 289,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Winter 2025 street style is all about bold self-expression and practical luxury. This season's trends prove that cold weather dressing doesn't mean sacrificing style. From runway-inspired looks to everyday essentials with a twist, here's what fashion-forward individuals are wearing on the streets of major cities worldwide.</p>

                <h3>The Oversized Everything Movement</h3>
                <p><strong>Volume is having a major moment</strong>. Oversized coats, chunky knits, and baggy pants dominate the winter landscape. This trend isn't just about comfort—it's about creating dramatic silhouettes that make a statement. Pair an oversized blazer with fitted bottoms for a balanced look, or go full volume for maximum impact.</p>

                <h3>Statement Accessories Take Center Stage</h3>
                <p>Winter accessories are no longer just functional—they're the focal point of outfits. Think oversized scarves worn as statement pieces, chunky gold jewelry layered over turtlenecks, and bold bags in unexpected shapes and colors. The key is choosing one statement accessory and building your outfit around it.</p>

                <h3>Color in the Cold</h3>
                <p>Forget winter neutrals—this season is embracing rich jewel tones, unexpected color combinations, and even pastels in winter fabrics. Burgundy, forest green, and deep purple are replacing traditional blacks and grays, while those brave enough are experimenting with clashing patterns and textures for truly unique looks.</p>
            `,
            createdAt: new Date('2024-12-01').toISOString(),
            updatedAt: new Date('2024-12-01').toISOString(),
        },
        {
            title: 'How to Build a Capsule Wardrobe That Actually Works',
            slug: 'build-capsule-wardrobe',
            category: 'Style Tips',
            excerpt: 'Master the art of minimalist fashion with our guide to creating a versatile wardrobe with fewer pieces.',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
            readTime: '6 min read',
            featured: false,
            views: 412,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>A capsule wardrobe is more than just a minimalist trend—it's a strategic approach to dressing that can simplify your daily routine, reduce decision fatigue, and ensure you always look put-together. The concept is simple: curate a collection of essential, high-quality pieces that work together seamlessly, eliminating the need for excessive clothing while maximizing outfit possibilities.</p>

                <h3>Starting with the Foundation</h3>
                <p>Begin by identifying your <strong>lifestyle needs and personal style</strong>. A creative professional's capsule will look different from a corporate executive's. Choose a neutral color palette as your base—think black, white, gray, navy, and beige—then add two or three accent colors you love. This foundation ensures everything coordinates effortlessly.</p>

                <h3>The Essential Pieces</h3>
                <p>A functional capsule wardrobe typically includes: well-fitting jeans in a dark wash, tailored trousers, a versatile blazer, quality t-shirts in neutral colors, button-down shirts, a little black dress, comfortable yet stylish shoes for various occasions, and a classic coat. The key is choosing pieces that can be dressed up or down and layered in multiple ways.</p>

                <h3>Quality Over Quantity</h3>
                <p>Invest in the best quality you can afford for your core pieces. A well-made item will last years longer than fast fashion alternatives, ultimately saving money and reducing waste. Look for natural fabrics, strong stitching, and classic cuts that won't go out of style next season.</p>

                <h3>Making It Work</h3>
                <p>The magic of a capsule wardrobe is in the mixing and matching. Each piece should work with at least three other items in your collection. Test your combinations by planning outfits for different occasions—work, weekend, evening—to ensure you have sufficient variety. Remember, the goal isn't deprivation; it's intentionality.</p>
            `,
            createdAt: new Date('2024-12-05').toISOString(),
            updatedAt: new Date('2024-12-05').toISOString(),
        },
        {
            title: 'Behind the Seams: Interview with Urban Rebel Founder',
            slug: 'urban-rebel-founder-interview',
            category: 'Behind the Scenes',
            excerpt: 'Get an exclusive look into the creative process and inspiration behind one of our most popular indie brands.',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
            readTime: '8 min read',
            featured: false,
            views: 156,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>We sat down with Alex Chen, founder of Urban Rebel, to discuss the journey from fashion school graduate to running one of the most exciting indie brands in contemporary streetwear. What started as a college project selling custom-designed hoodies has grown into a full lifestyle brand with a devoted following and a mission to challenge conventional fashion norms.</p>

                <h3>The Origin Story</h3>
                <p>"I never intended to start a fashion brand," Alex admits. "I was just frustrated with the lack of options for people who wanted <strong>streetwear with substance</strong>. Everything felt either too commercial or trying too hard to be edgy. I wanted to create something authentic that spoke to real experiences and real style." That authenticity has become Urban Rebel's signature, with designs that reference urban culture, art, and social commentary without being preachy.</p>

                <h3>The Design Philosophy</h3>
                <p>Each Urban Rebel collection tells a story. Alex explains: "We start with a concept—maybe it's a neighborhood, a social movement, or a piece of art that inspires us. Then we translate that into designs, colors, and materials that capture the essence of that inspiration. We're not just making clothes; we're creating wearable art that means something."</p>

                <h3>Sustainability and Ethics</h3>
                <p>Urban Rebel has committed to sustainable production from the start. "It would have been cheaper and easier to go the fast fashion route, but that's exactly what we're rebelling against," Alex notes. The brand works with ethical manufacturers, uses organic and recycled materials whenever possible, and produces in small batches to minimize waste. "Our customers appreciate that their purchase supports fair labor and environmental responsibility."</p>

                <h3>What's Next</h3>
                <p>Looking to the future, Alex is excited about expanding into new product categories while staying true to the brand's core values. "We're exploring accessories, home goods, and even collaborations with artists we admire. But no matter how big we grow, we'll never lose sight of what makes Urban Rebel special—that connection with our community and commitment to authentic, sustainable fashion."</p>
            `,
            createdAt: new Date('2024-12-10').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString(),
        },
        {
            title: 'Color Theory: Mastering Bold Fashion Combinations',
            slug: 'color-theory-fashion',
            category: 'Style Tips',
            excerpt: 'Learn how to mix and match colors like a pro and create eye-catching outfits that express your personality.',
            image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
            readTime: '5 min read',
            featured: false,
            views: 267,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Understanding color theory can transform your approach to getting dressed. While many people stick to safe neutrals or monochrome outfits, learning to confidently combine colors opens up infinite styling possibilities. The secret isn't just knowing which colors "go together"—it's understanding why they work and how to use color to express your personal style.</p>

                <h3>The Color Wheel Basics</h3>
                <p>Start with the fundamental relationships: <strong>complementary colors</strong> (opposite on the wheel) create bold, high-contrast looks—think purple and yellow, or red and green. Analogous colors (next to each other) offer harmonious, sophisticated combinations like blue, blue-green, and green. Triadic schemes use three equally-spaced colors for vibrant, balanced outfits.</p>

                <h3>Beyond the Rules</h3>
                <p>While color theory provides guidelines, fashion is about breaking rules thoughtfully. Consider tone and saturation alongside hue. A muted terracotta can work beautifully with a soft sage, even though pure orange and green might clash. Pay attention to the undertones—cool blues versus warm blues, for instance—as matching undertones creates cohesion even with unexpected color pairings.</p>

                <h3>Practical Application</h3>
                <p>Start small by adding one colorful piece to a neutral outfit. As you gain confidence, experiment with two-color combinations, then gradually build to more complex schemes. Use accessories to test bold color choices before committing to larger garments. Remember, the most important rule in fashion is that confidence makes any color combination work.</p>
            `,
            createdAt: new Date('2024-12-15').toISOString(),
            updatedAt: new Date('2024-12-15').toISOString(),
        },
        {
            title: 'The Vintage Revival: Why Retro Fashion Is Back',
            slug: 'vintage-revival-retro-fashion',
            category: 'Trends',
            excerpt: 'Explore the resurgence of vintage aesthetics and how modern brands are reimagining classic styles.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
            readTime: '6 min read',
            featured: false,
            views: 324,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Fashion has always been cyclical, but today's vintage revival goes deeper than simple nostalgia. Modern consumers are rediscovering styles from the '70s, '80s, and '90s not just for their aesthetic appeal, but because these eras represent a time when clothing was made to last and personal style reigned over mass trends. This movement is reshaping both how we dress and how we think about fashion's future.</p>

                <h3>The Appeal of Authenticity</h3>
                <p>Vintage fashion offers something increasingly rare in today's market: <strong>uniqueness and craftsmanship</strong>. A genuine vintage piece has history, character, and construction quality often superior to contemporary fast fashion. Whether it's the perfect fit of '90s denim or the romantic details of '70s blouses, these garments tell stories and offer individuality that mass-produced items simply cannot match.</p>

                <h3>Modern Vintage: The Best of Both Worlds</h3>
                <p>Contemporary brands are successfully bridging past and present by creating vintage-inspired designs with modern updates. They're taking the silhouettes, patterns, and details we love from previous decades and reinterpreting them with current fabrics, sustainable production methods, and contemporary fits. This approach satisfies our desire for nostalgic aesthetics while addressing modern comfort and ethical concerns.</p>

                <h3>Sustainability Through Timelessness</h3>
                <p>The vintage revival is inherently sustainable. By embracing secondhand shopping and vintage-inspired designs, we're pushing back against the disposable fashion cycle. These timeless pieces encourage a different relationship with clothing—one based on longevity, quality, and personal connection rather than fleeting trends. As the fashion industry faces increasing pressure to reduce waste, looking to the past for inspiration offers a clear path forward.</p>
            `,
            createdAt: new Date('2024-12-18').toISOString(),
            updatedAt: new Date('2024-12-18').toISOString(),
        },
        {
            title: 'Ethical Production: What Really Goes Into Your Clothes',
            slug: 'ethical-production-clothes',
            category: 'Sustainability',
            excerpt: 'An in-depth look at the manufacturing process and why ethical production matters now more than ever.',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
            readTime: '7 min read',
            featured: false,
            views: 198,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Every garment has a story that begins long before it reaches store shelves. Understanding the true journey of our clothes—from raw materials to finished product—reveals why ethical production isn't just a buzzword, but a necessary evolution in how fashion operates. The choices brands make at every step impact real people, communities, and our planet.</p>

                <h3>The Supply Chain Reality</h3>
                <p>Fashion production involves numerous stages: cotton farming or synthetic material creation, spinning and weaving fabrics, dyeing and finishing, cutting and sewing, and finally distribution. At each stage, decisions about <strong>worker treatment, environmental impact, and quality</strong> shape the final product's ethical footprint. Traditional fast fashion often prioritizes speed and low cost, leading to exploitative labor practices and environmental damage.</p>

                <h3>What Ethical Really Means</h3>
                <p>Ethical production encompasses fair wages that support living standards, safe working conditions free from hazards, reasonable working hours, environmental responsibility in material sourcing and production processes, and transparency throughout the supply chain. Brands committed to ethical production often invest in long-term relationships with manufacturers, ensuring standards are consistently met.</p>

                <h3>The True Cost of Cheap Clothing</h3>
                <p>That $10 shirt seems like a bargain until you consider what corners were cut to achieve that price point. Someone along the supply chain paid the real cost—whether it's the garment worker earning poverty wages, the environment suffering from toxic dye runoff, or the quality compromises that mean the shirt falls apart after a few washes. Understanding these hidden costs helps us make more informed purchasing decisions.</p>

                <h3>Supporting Ethical Brands</h3>
                <p>As consumers, we have power. By choosing brands that prioritize ethical production, asking questions about manufacturing practices, and being willing to pay fair prices for quality garments, we drive industry change. Many ethical brands now offer full supply chain transparency, allowing you to see exactly where and how your clothes are made. This accountability is transforming fashion from the ground up.</p>
            `,
            createdAt: new Date('2024-12-22').toISOString(),
            updatedAt: new Date('2024-12-22').toISOString(),
        },
        {
            title: 'Accessorize Like a Pro: Elevate Any Outfit',
            slug: 'accessorize-like-pro',
            category: 'Style Tips',
            excerpt: 'From statement jewelry to bold bags, learn how the right accessories can transform your entire look.',
            image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80',
            readTime: '4 min read',
            featured: false,
            views: 445,
            authorId: testUser.id,
            authorName: testUser.name,
            content: `
                <p>Accessories are the secret weapon of stylish dressing. The right pieces can transform a basic outfit into something special, express your personality, and update your look without buying an entirely new wardrobe. Mastering the art of accessorizing means understanding proportion, balance, and when to make bold choices versus subtle statements.</p>

                <h3>The Power of Statement Pieces</h3>
                <p>A <strong>statement accessory</strong> should be the focal point of your outfit—think oversized earrings, a bold necklace, a unique bag, or eye-catching shoes. The key is choosing one statement piece and keeping everything else relatively simple. If you're wearing dramatic earrings, skip the necklace. A bold bag pairs perfectly with minimalist jewelry. This approach creates visual interest without overwhelming your look.</p>

                <h3>Layering and Mixing</h3>
                <p>Don't be afraid to layer accessories, but do it thoughtfully. Stack delicate rings and bracelets for a bohemian vibe, or mix metals for a modern, eclectic look. When layering necklaces, vary the lengths and weights to create dimension. The rule of odd numbers often works well—three necklaces or five rings tend to look more balanced than even numbers.</p>

                <h3>Bags and Shoes as Foundation</h3>
                <p>Your bag and shoes set the tone for your entire outfit. A structured leather bag adds polish to casual looks, while a playful crossbody brings personality to formal outfits. Similarly, shoes can completely change an outfit's vibe—swap sneakers for heels, and your jeans-and-tee goes from weekend casual to dinner-ready. Invest in versatile styles that work across multiple looks, then add trend-driven pieces for variety.</p>
            `,
            createdAt: new Date('2024-12-28').toISOString(),
            updatedAt: new Date('2024-12-28').toISOString(),
        },
    ];

    await db.insert(blogPosts).values(sampleBlogPosts);
    
    console.log('✅ Blog posts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});