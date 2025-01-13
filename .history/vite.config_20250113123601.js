import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { glob } from 'glob'
import path from 'path'

// Helper function to create entry points
function createEntries() {
  const entries = {
    main: path.resolve(__dirname, 'src/main.js'),
  }

  // Handle JavaScript files
  glob.sync('src/features/**/*.js').forEach((file) => {
    const key = path.relative('src', file.slice(0, -3))
    entries[key] = path.resolve(__dirname, file)
  })

  // Handle CSS files
  glob.sync('src/features/**/*.css').forEach((file) => {
    const key = path.relative('src', file.slice(0, -4))
    entries[key] = path.resolve(__dirname, file)
  })

  return entries
}

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
      input: createEntries(),
      output: {
        format: 'es',
        entryFileNames: (chunkInfo) => {
          const extension = chunkInfo.facadeModuleId?.endsWith('.css')
            ? '.css'
            : '.js'
          return `${chunkInfo.name}${extension}`
        },
        assetFileNames: (assetInfo) => {
          return `[name][extname]`
        },
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
