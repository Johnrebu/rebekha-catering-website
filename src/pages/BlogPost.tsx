import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(45,40%,94%)]">
        <h1 className="text-3xl font-normal text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Post Not Found</h1>
        <button
          onClick={() => navigate('/blog')}
          className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] transition-all duration-300"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  if (relatedPosts.length < 3) {
    const others = blogPosts
      .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...others);
  }

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <Navigation />

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-white"
            >
              <span className="inline-block px-4 py-1 mb-4 text-xs uppercase tracking-widest bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]">
                {post.category}
              </span>

              <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {post.title}
              </h1>

              <div className="flex flex-wrap justify-center items-center gap-8 text-sm uppercase tracking-widest opacity-90">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[hsl(30,10%,45%)] hover:text-[hsl(43,76%,58%)] transition-colors mb-12">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <article className="prose prose-lg prose-eden max-w-none">
              <div
                className="text-[hsl(30,10%,35%)] leading-relaxed space-y-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 pt-8 border-t border-[hsl(40,20%,85%)]">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-wider text-[hsl(30,10%,55%)] bg-[hsl(45,40%,94%)] px-3 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-[hsl(43,76%,58%)] hover:text-[hsl(38,70%,45%)] transition-colors">
                    <Share2 className="h-4 w-4" /> Share Story
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Related Stories
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedPosts.map((related) => (
              <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl text-[hsl(30,20%,15%)] mb-2 group-hover:text-[hsl(43,76%,58%)] transition-colors line-clamp-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {related.title}
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-[hsl(30,10%,55%)]">
                      {new Date(related.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
