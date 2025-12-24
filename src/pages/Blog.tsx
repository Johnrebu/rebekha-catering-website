import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-100/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
              Our Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-gray-900 leading-tight">
              Culinary <span className="text-amber-600">Stories</span> & Event <span className="text-red-700">Inspiration</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore the world of premium catering, from wedding menu planning tips to behind-the-scenes stories from our kitchen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          
          {/* Categories Filter (Visual only for now, can be functional later) */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button variant="secondary" className="bg-amber-100 text-amber-900 hover:bg-amber-200">
              All Posts
            </Button>
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="ghost" 
                className="text-gray-600 hover:text-amber-700 hover:bg-amber-50"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white flex flex-col">
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge on Image */}
                      <div className="absolute top-4 left-4">
                         <Badge className="bg-white/90 text-amber-900 hover:bg-white backdrop-blur-sm shadow-sm">
                           {post.category}
                         </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                       <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                         <div className="flex items-center gap-1">
                           <Calendar className="h-3 w-3" />
                           {new Date(post.date).toLocaleDateString()}
                         </div>
                         <div className="flex items-center gap-1">
                           <User className="h-3 w-3" />
                           {post.author}
                         </div>
                       </div>
                       <h3 className="text-xl font-bold font-serif group-hover:text-amber-700 transition-colors line-clamp-2">
                         {post.title}
                       </h3>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-0 border-t border-gray-100 mt-auto p-6">
                      <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
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
