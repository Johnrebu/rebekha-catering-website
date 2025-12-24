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
  }
];
