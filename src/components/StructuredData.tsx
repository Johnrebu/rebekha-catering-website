import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  // Organization schema with logo - critical for Google search results
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rebekha Catering Services",
    "url": "https://rebekhacaterers.online",
    "logo": "https://rebekhacaterers.online/rebekha-logo.png",
    "image": "https://rebekhacaterers.online/rebekha-logo.png",
    "description": "Premium veg & non-veg catering services in West Tambaram, Chennai. Serving love since 1998.",
    "foundingDate": "1998",
    "slogan": "Serving Love Since 1998",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Tambaram",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Tamil"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Rebekha Catering Services",
    "image": "https://rebekhacaterers.online/rebekha-logo.png",
    "logo": "https://rebekhacaterers.online/rebekha-logo.png",
    "description": "Premium veg & non-veg catering services in West Tambaram, Chennai. Authentic homemade taste for weddings, birthdays, corporate events.",
    "url": "https://rebekhacaterers.online",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Tambaram",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9226",
      "longitude": "80.1275"
    },
    "telephone": "+91-XXXXXXXXXX",
    "servesCuisine": ["Indian", "South Indian", "Vegetarian", "Non-Vegetarian"],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "foundingDate": "1998",
    "slogan": "Serving Love Since 1998",
    "hasMenu": {
      "@type": "Menu",
      "name": "Catering Menu",
      "description": "Authentic vegetarian and non-vegetarian menus for all occasions"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Catering Service",
    "provider": {
      "@type": "Restaurant",
      "name": "Rebekha Catering Services"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chennai"
    },
    "offers": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Catering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Birthday Catering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Event Catering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Private Dining"
        }
      }
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rebekha Catering Services",
    "image": "https://rebekhacaterers.online/rebekha-logo.png",
    "description": "Premium catering services in Chennai since 1998",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Tambaram",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600045",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Antony Raj"
        },
        "datePublished": "2024-12-15",
        "reviewBody": "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. Rebekha Caterers made our special day truly memorable.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "datePublished": "2024-11-10",
        "reviewBody": "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success! The team was punctual and the food quality was exceptional.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Anjali Sharma"
        },
        "datePublished": "2024-10-22",
        "reviewBody": "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful! My daughter's birthday was perfect thanks to their amazing service.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rebekhacaterers.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://rebekhacaterers.online/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Menu",
        "item": "https://rebekhacaterers.online/menu"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Testimonials",
        "item": "https://rebekhacaterers.online/testimonials"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": "https://rebekhacaterers.online/contact"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
