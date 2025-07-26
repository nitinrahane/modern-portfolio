import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Configuration for subdomain deployment
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://v2.nitinrahane.com', // Change this to your preferred subdomain
  base: '/', // Root deployment
  
  // Build configuration for production
  build: {
    inlineStylesheets: 'auto',
    split: true,
  },
  
  // Optimize for performance
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['framer-motion'],
          },
        },
      },
    },
  },
  
  // SEO and meta configuration
  experimental: {
    contentCollectionCache: true,
  },
});
