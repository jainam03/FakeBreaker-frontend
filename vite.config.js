import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_API_URL': JSON.stringify(process.env.VITE_APP_API_URL),
  },
  server: {
    historyApiFallback: true, // Works for development (not needed for production)
  },
  build: {
    outDir: 'dist', // Ensures the build is placed in the correct directory
    rollupOptions: {
      input: {
        main: 'index.html', // Ensures index.html is used for all routes
      },
    },
  },
});
