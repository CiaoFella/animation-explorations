import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { glob } from 'glob'
import path from 'path'

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
      input: Object.fromEntries([
        ['main', path.resolve(__dirname, 'src/main.js')],
        ...glob
          .sync('src/features/**/*.*')
          .map((file) => [
            path.relative('src', file.replace(/\.[^/.]+$/, '')),
            path.resolve(__dirname, file),
          ]),
      ]),
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
