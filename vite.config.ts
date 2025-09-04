import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080
  },
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // Production optimizations
  build: {
    outDir: 'dist',
    sourcemap: mode === 'production' ? 'hidden' : true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select'],
          charts: ['recharts', 'chart.js', 'react-chartjs-2'],
          utils: ['date-fns', 'clsx', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },

  // Enable source maps for debugging
  css: {
    devSourcemap: true
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
    'react',
    'react-dom',
    'react-router-dom',
    '@tanstack/react-query',
    'lucide-react',
    'clsx',
    'tailwind-merge']

  }
}));