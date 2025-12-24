import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Button onClick={() => navigate('/blog')} variant="default">
          Back to Blog
        </Button>
      </div>
    );
  }

  // Related Posts Logic: Same category, excluding current
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);
  
  // If not enough same category, fill with others
  if (relatedPosts.length < 2) {
    const others = blogPosts
      .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
      .slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...others);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <Link to="/blog">
                  <Badge variant="outline" className="text-white border-white/30 hover:bg-white/10 cursor-pointer">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Back to Blog
                  </Badge>
                </Link>
                <Badge className="bg-amber-500 hover:bg-amber-600 border-none text-white">
                  {post.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-amber-400" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>5 min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
          
          {/* Main Content */}
          <article className="prose prose-lg prose-amber max-w-none">
             {/* Render HTML content safely */}
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
             
             {/* Tags */}
             <div className="not-prose mt-12 pt-8 border-t border-gray-100">
               <div className="flex flex-wrap gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition-colors">
                     <Tag className="mr-1 h-3 w-3" /> {tag}
                   </span>
                 ))}
               </div>
             </div>
          </article>

          {/* Sidebar / Related */}
          <aside className="space-y-8">
            <div className="bg-amber-50 rounded-2xl p-6 lg:sticky lg:top-24">
              <h3 className="font-serif text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                Related Articles
              </h3>
              
              <div className="space-y-6">
                {relatedPosts.map(related => (
                  <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(related.date).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>

              <Separator className="my-6 bg-amber-200/50" />

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Need catering for your next event?</p>
                <Link to="/contact">
                  <Button className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-800 hover:to-amber-700">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
