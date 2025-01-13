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
      input: {
        main: './src/main.js',
        ...Object.fromEntries([
          ...glob
            .sync('src/features/**/*.js')
            .map((file) => [
              path.relative('src', file.slice(0, file.length - 3)),
              path.resolve(__dirname, file),
            ]),
          ...glob
            .sync('src/features/**/*.css')
            .map((file) => [
              path.relative('src', file.slice(0, file.length - 4)),
              path.resolve(__dirname, file),
            ]),
        ]),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].[ext]',
        assetFileNames: '[name].[ext]',
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
