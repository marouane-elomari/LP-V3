import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Resolves Figma-exported asset imports to actual files in src/assets/
    {
      name: 'figma-asset-resolver',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          const filename = id.replace('figma:asset/', '')
          return path.resolve(__dirname, 'src/assets', filename)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Admin-only heavy libs — only loaded on /admin routes
          if (
            id.includes('recharts') ||
            id.includes('react-dnd') ||
            id.includes('react-dnd-html5-backend')
          ) {
            return 'chunk-charts-dnd'
          }
          // MUI — split away from landing page bundle
          if (
            id.includes('@mui') ||
            id.includes('@emotion')
          ) {
            return 'chunk-mui'
          }
          // Radix UI primitives — shared UI components
          if (id.includes('@radix-ui')) {
            return 'chunk-radix'
          }
          // Animation library
          if (id.includes('motion') || id.includes('framer-motion')) {
            return 'chunk-motion'
          }
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'chunk-react'
          }
        },
      },
    },
  },
})
