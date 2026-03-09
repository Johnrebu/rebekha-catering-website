export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'art-of-menu-planning-wedding',
    title: 'The Art of Menu Planning for Your Dream Wedding',
    excerpt: 'Discover the secrets to creating a perfect wedding menu that delights your guests and complements your special day.',
    content: `
      <h2>Creating Unforgettable Culinary Memories</h2>
      <p>Your wedding day is one of the most significant moments of your life, and the food you serve plays a pivotal role in creating lasting memories for you and your guests. A well-curated menu is more than just a meal; it's an experience that brings people together and celebrates your union.</p>

      <h3>1. Know Your Guest List</h3>
      <p>Understanding your guests is the first step. Are there dietary restrictions? Cultural preferences? adventurous eaters? diverse age groups? A successful menu caters to a variety of tastes while ensuring everyone finds something delicious to enjoy. Offering a mix of vegetarian and non-vegetarian options is always a safe and thoughtful bet.</p>

      <h3>2. Seasonality is Key</h3>
      <p>Embrace the season! Fresh, seasonal ingredients not only taste better but are also more cost-effective. A summer wedding might call for light, refreshing salads and grilled specialties, while a winter celebration invites hearty, comforting dishes with rich flavors.</p>

      <h3>3. Balance of Flavors and Textures</h3>
      <p>A great menu is like a symphony – it needs balance. aim for a harmony of flavors: salty, sweet, sour, and spicy. incorporate different textures to keep the palate engaged. For example, pair a creamy curry with a crispy papadum or a soft naan.</p>

      <h3>4. Don't Forget the Presentation</h3>
      <p>They say we eat with our eyes first. Beautifully presented food elevates the entire dining experience. Work with your caterer to ensure that the plating and buffet setup are visually stunning and match your wedding theme.</p>

      <p>At Rebekha Caterers, we specialize in crafting personalized menus that reflect your unique style and taste. Let us help you design a culinary journey that your guests will talk about for years to come.</p>
    `,
    date: '2025-10-15',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
    category: 'Wedding Planning',
    tags: ['Wedding', 'Menu Planning', 'Catering Tips']
  },
  {
    id: '2',
    slug: 'corporate-catering-impressions',
    title: 'Corporate Catering: How to Make a Great Impression',
    excerpt: 'Elevate your next business event with catering that speaks professionalism and quality. Learn why food matters in the corporate world.',
    content: `
      <h2>Fueling Success with Food</h2>
      <p>In the corporate world, every detail counts. From the venue to the presentation slides, everything reflects your company's brand. Catering is often an overlooked aspect, yet it has the power to make or break a business event. Whether it's a client meeting, a team-building workshop, or an annual gala, the food you serve sends a message.</p>

      <h3>The Power of a Good Lunch</h3>
      <p>A satisfying meal can boost morale and productivity. It shows your team and clients that you value their time and well-being. Avoiding heavy, sleep-inducing foods and opting for lighter, nutritious options can keep energy levels high throughout the afternoon.</p>

      <h3>Networking Over Nibbles</h3>
      <p>Food is a natural social lubricant. A well-organized buffet or a standing cocktail reception encourages mingling and networking. Finger foods and bite-sized appetizers are perfect for keeping conversations flowing without the formality of a sit-down dinner.</p>

      <h3>Professionalism in Presentation</h3>
      <p>Just as you dress for success, your catering should look the part. Clean setups, professional staff, and high-quality tableware contribute to a polished image. It demonstrates attention to detail and a commitment to excellence.</p>

      <p>Planning your next corporate event? Let Rebekha Caterers handle the menu so you can focus on the business at hand. We provide seamless, professional catering services tailored to your corporate needs.</p>
    `,
    date: '2025-11-02',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    category: 'Corporate Events',
    tags: ['Corporate', 'Business', 'Event Planning']
  },
  {
    id: '3',
    slug: 'traditional-south-indian-feast',
    title: 'The Magic of a Traditional South Indian Feast',
    excerpt: 'Dive into the rich heritage and vibrant flavors of South Indian cuisine. A journey through spices, tradition, and taste.',
    content: `
      <h2>More Than Just a Meal: A Tradition</h2>
      <p>South Indian cuisine is renowned worldwide for its generous use of spices, rice, and coconut. But a traditional feast, often served on a banana leaf, is more than just food; it's a cultural ritual that celebrates hospitality and community.</p>

      <h3>The Banana Leaf Experience</h3>
      <p>Eating on a banana leaf is an integral part of the experience. It's eco-friendly, hygienic, and is believed to enhance the flavor of the hot food served on it. Plus, there's a specific order to how dishes are served—from salt and pickles to the sweet Payasam at the end.</p>

      <h3>The Symphony of Spices</h3>
      <p>From the mustard seeds popping in hot oil to the fragrance of curry leaves, South Indian cooking is a sensory delight. Dishes like Sambar, Rasam, and Avial are not just delicious but are crafted with a balance of nutrition and digestion in mind.</p>

      <h3>Celebrating Every Occasion</h3>
      <p>Whether it's a festival, a wedding, or a family gathering, no celebration is complete without a grand spread. The variety of vegetable preparations, lentil stews, and crispy snacks ensures there's something for everyone to relish.</p>
      
      <p>Craving the authentic taste of home? Rebekha Caterers brings you the finest traditional South Indian dishes, prepared with love and authentic recipes passed down through generations.</p>
    `,
    date: '2025-12-10',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80',
    category: 'Culinary Culture',
    tags: ['South Indian', 'Traditional', 'Food Culture']
  },
  {
    id: '4',
    slug: 'eco-friendly-catering-trends',
    title: 'Rising Trends in Eco-Friendly Catering',
    excerpt: 'Sustainability is not just a buzzword; it is a responsibility. Explore how eco-friendly practices are reshaping the catering industry.',
    content: `
      <h2>Sustainable Celebrations</h2>
      <p>As we become more conscious of our environmental impact, the demand for eco-friendly catering is on the rise. Hosting a green event doesn't mean compromising on quality or style; in fact, it often adds a layer of thoughtfulness and innovation to the occasion.</p>

      <h3>Zero-Waste Initiatives</h3>
      <p>One of the biggest trends is the move towards zero-waste events. This involves using biodegradable or reusable serveware, composting food scraps, and minimizing plastic usage. Using real china and glass instead of disposables elevates the look of the event while significantly reducing landfill waste.</p>

      <h3>Locally Sourced Ingredients</h3>
      <p>Farm-to-table isn't just for restaurants. Caterers are increasingly partnering with local farmers to source fresh, seasonal produce. This reduces the carbon footprint associated with transportation and supports the local economy. Plus, fresh local ingredients simply taste better!</p>

      <h3>Plant-Forward Menus</h3>
      <p>While meat is still popular, there's a growing shift towards plant-forward menus. Delicious vegetarian and vegan options are taking center stage, appealing to health-conscious guests and reducing the environmental impact of livestock farming.</p>

      <p>At Rebekha Caterers, we are committed to sustainable practices. Ask us how we can help make your special event both beautiful and eco-friendly.</p>
    `,
    date: '2026-01-05',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
    category: 'Sustainability',
    tags: ['Eco-friendly', 'Sustainability', 'Green Events']
  },
  {
    id: '5',
    slug: 'wedding-catering-tips-for-guest-experience',
    title: 'Wedding Catering Tips to Delight Every Guest',
    excerpt: 'From welcome drinks to dessert counters, practical wedding catering tips that improve guest comfort and event flow.',
    content: `
      <h2>Plan the Food Journey, Not Just the Food List</h2>
      <p>A successful wedding menu is about timing, variety, and comfort. Guests remember how smoothly the meal experience felt from start to finish.</p>

      <h3>1. Start with Smart Welcome Service</h3>
      <p>Offer two to three easy-to-eat starters and refreshing beverages as guests arrive. Keep options balanced with both veg and non-veg choices.</p>

      <h3>2. Build a Comfortable Buffet Flow</h3>
      <p>Separate counters for starters, mains, breads, and desserts reduce crowding. Clear sign boards help guests choose quickly.</p>

      <h3>3. Include Familiar + Signature Items</h3>
      <p>Blend classic crowd favorites with one or two signature dishes to make your menu memorable without being risky.</p>

      <h3>4. Keep Senior Guests in Mind</h3>
      <p>Add mild options, less-oil choices, and easy-access service points for families and elderly guests.</p>

      <p>Need help planning your wedding menu in Chennai? Rebekha Caterers can create a guest-friendly plan based on your venue, crowd, and budget.</p>
    `,
    date: '2026-01-28',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80',
    category: 'Wedding Planning',
    tags: ['Wedding Catering Tips', 'Guest Experience', 'Event Planning']
  },
  {
    id: '6',
    slug: 'menu-customization-guide-for-events',
    title: 'Menu Customization Guide for Weddings, Birthdays and Corporate Events',
    excerpt: 'A practical guide to building custom catering menus based on guest profile, service style, and budget.',
    content: `
      <h2>Create a Menu That Fits Your Event</h2>
      <p>Every function has different needs. A custom menu helps you avoid waste, satisfy guests, and control costs.</p>

      <h3>Step 1: Define Guest Mix</h3>
      <p>Estimate vegetarian, non-vegetarian, kids, and senior guest proportions early. This ratio decides your dish count and serving quantities.</p>

      <h3>Step 2: Match the Service Format</h3>
      <p>Live counters work well for weddings and receptions. Compact buffet spreads are ideal for office and indoor events.</p>

      <h3>Step 3: Balance Budget and Variety</h3>
      <p>Prioritize quality on key items like starters and biryani, then add value with seasonal vegetables and local favorites.</p>

      <h3>Step 4: Confirm Dietary Preferences</h3>
      <p>Check for Jain, no-onion/no-garlic, low-spice, and allergy-related requirements in advance for smooth service.</p>

      <p>At Rebekha Caterers, we help families and companies in Chennai build customized menus with transparent planning and clear pricing.</p>
    `,
    date: '2026-02-08',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
    category: 'Menu Guides',
    tags: ['Menu Customization', 'Budget Planning', 'Catering Guide']
  },
  {
    id: '7',
    slug: 'event-planning-checklist-catering',
    title: 'Event Planning Checklist: Catering Essentials You Should Not Miss',
    excerpt: 'Use this catering checklist to stay organized before your wedding, birthday, or corporate event in Chennai.',
    content: `
      <h2>Ahead-of-Time Planning Prevents Last-Minute Stress</h2>
      <p>A simple checklist can save your event day. Keep all catering decisions tracked in one place.</p>

      <h3>30 Days Before</h3>
      <p>Finalize guest count range, confirm venue kitchen rules, and shortlist menu themes.</p>

      <h3>15 Days Before</h3>
      <p>Lock menu items, service timing, counter plan, and special dietary requests.</p>

      <h3>7 Days Before</h3>
      <p>Share final guest estimate, entry timing, and onsite coordinator details with the catering team.</p>

      <h3>Event Day</h3>
      <p>Keep one family coordinator or event manager as the point of contact so service decisions stay quick and smooth.</p>

      <p>Download-ready planning templates and coordinated service support are available when you book with Rebekha Caterers.</p>
    `,
    date: '2026-02-19',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    category: 'Event Planning',
    tags: ['Checklist', 'Catering Essentials', 'Event Timeline']
  },
  {
    id: '8',
    slug: 'seasonal-catering-specials-2026',
    title: 'Seasonal Catering Specials 2026: Limited Menu Promotions',
    excerpt: 'Explore seasonal specials for wedding and party catering with festive menu bundles and value pricing.',
    content: `
      <h2>Fresh Seasonal Menus, Better Value</h2>
      <p>Seasonal ingredients improve flavor and help us offer attractive pricing for larger events.</p>

      <h3>Summer Special Counters</h3>
      <p>Live chaat, chilled beverages, and lighter main course combinations designed for outdoor comfort.</p>

      <h3>Monsoon Comfort Menus</h3>
      <p>Hot starters, regional gravies, and premium tea/coffee add-ons for indoor celebrations.</p>

      <h3>Festival and Wedding Bundles</h3>
      <p>Combo packages with welcome drinks, starters, mains, sweets, and service team support.</p>

      <p>Contact Rebekha Caterers for current seasonal offers available for your event date and location in Chennai.</p>
    `,
    date: '2026-03-01',
    author: 'Rebekha Team',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80',
    category: 'Seasonal Specials',
    tags: ['Seasonal Promotions', 'Wedding Offers', 'Catering Deals']
  }
];
