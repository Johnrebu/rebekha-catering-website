import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  author?: string;
  type?: string;
  locale?: string;
}

const SEO = ({
  title = "Rebekha Catering Services - Best Wedding & Corporate Catering in Chennai",
  description = "Award-winning veg & non-veg catering services in Chennai. Serving love since 1998. Perfect for weddings, birthday parties, corporate events & private dining. Authentic flavors, hygienic preparation, affordable prices.",
  keywords = "catering services Chennai, wedding catering Chennai, corporate event catering, best caterers West Tambaram, veg non-veg catering, birthday party catering, cheap catering services, professional catering Tamil Nadu",
  ogImage = "https://rebekhacaterers.online/rebekha-logo.png",
  ogUrl = "https://rebekhacaterers.online",
  canonical = "https://rebekhacaterers.online",
  author = "Rebekha Catering Services",
  type = "website",
  locale = "en_IN",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      <meta name="url" content={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rebekha Catering Services" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="google-site-verification" content="" />
      <meta name="msvalidate.01" content="" />
    </Helmet>
  );
};

export default SEO;
