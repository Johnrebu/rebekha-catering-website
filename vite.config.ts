import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching & parallelization
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'next-themes'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod', 'cmdk'],
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-popover',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-context-menu',
          ],
          'data-viz': ['recharts', '@tanstack/react-query'],
          'maps': ['leaflet', 'react-leaflet', 'react-leaflet-cluster'],
          'animation': ['@tsparticles/react', '@tsparticles/slim', 'gsap'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/analytics'],
          'ui-components': ['sonner', 'vaul', 'embla-carousel-react'],
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    // Fast minification
    minify: 'esbuild',
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // Keep class names for easier debugging
      keepNames: true,
    },
    // CSS code splitting for better caching
    cssCodeSplit: true,
    // Source maps for production debugging (gzip-friendly)
    sourcemap: mode === 'development',
    // Report compressed file sizes
    reportCompressedSize: mode === 'production',
    // Enable terser for better tree-shaking (optional)
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } : undefined,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hook-form',
      'zod',
      'framer-motion',
    ],
    exclude: ['@tsparticles/slim'],
  },
}));
