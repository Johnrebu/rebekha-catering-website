import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)] flex items-center justify-center">
      <div className="text-center px-6">
        <h1
          className="text-8xl md:text-9xl text-[hsl(43,76%,58%)] mb-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          404
        </h1>
        <h2
          className="text-3xl md:text-4xl text-[hsl(30,20%,15%)] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Page Not Found
        </h2>
        <p className="text-[hsl(30,10%,45%)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 flex items-center gap-2 mx-auto">
            <Home className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
