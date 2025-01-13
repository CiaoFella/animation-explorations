import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { glob } from 'glob'
import path from 'path'

// vite.config.js
export default defineConfig({
  plugins: [eslint({ cache: false })],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: './src/main.js',
        ...Object.fromEntries([
          // Get all JS files
          ...glob
            .sync('src/features/**/*.js')
            .map((file) => [
              path.relative('src', file.slice(0, file.length - 3)),
              path.resolve(__dirname, file),
            ]),
          // Get all CSS files
          ...glob
            .sync('src/features/**/*.css')
            .map((file) => [
              path.relative('src', file.slice(0, file.length - 4)),
              path.resolve(__dirname, file),
            ]),
        ]),
      },
      output: {
        format: 'umd',
        // Handle both JS and CSS files
        entryFileNames: '[name].[ext]',
        assetFileNames: '[name].[ext]',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
