import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  // Organization schema with logo - critical for Google search results
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rebekha Catering Services",
    "url": "https://rebekhacaterers.online",
    "logo": "https://rebekhacaterers.online/reblogo.png",
    "image": "https://rebekhacaterers.online/reblogo.png",
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
    "image": "https://rebekhacaterers.online/reblogo.png",
    "logo": "https://rebekhacaterers.online/reblogo.png",
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
    </Helmet>
  );
};

export default StructuredData;
