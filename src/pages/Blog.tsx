import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Our News
          </h1>
          <p className="text-xl font-light tracking-wide">
            Culinary stories and event inspiration
          </p>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-[hsl(40,20%,85%)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 text-sm uppercase tracking-wider bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]">
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 text-sm uppercase tracking-wider text-[hsl(30,10%,45%)] hover:text-[hsl(43,76%,58%)] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block group">
                  <div className="bg-white overflow-hidden">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs uppercase tracking-wider bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[hsl(30,10%,55%)] mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                      </div>

                      <h3 className="text-xl text-[hsl(30,20%,15%)] mb-3 group-hover:text-[hsl(43,76%,58%)] transition-colors line-clamp-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {post.title}
                      </h3>

                      <p className="text-sm text-[hsl(30,10%,45%)] leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-[hsl(43,76%,58%)] text-sm font-medium uppercase tracking-wider group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
