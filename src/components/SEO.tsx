import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const SEO = ({
  title = "Rebekha Catering Services - Serving Love Since 1998 | West Tambaram",
  description = "Premium veg & non-veg catering services in West Tambaram, Chennai. Authentic homemade taste for weddings, birthdays, corporate events. Custom menus, hygienic preparation. Call now!",
  keywords = "catering services West Tambaram, veg non-veg catering Chennai, wedding catering Tambaram, birthday catering Chennai, corporate catering, homemade catering services",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogUrl = "https://rebekhacatering.com",
  canonical = "https://rebekhacatering.com",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
