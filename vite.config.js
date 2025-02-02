import { defineConfig } from 'vite'
import fs from 'fs-extra'
import path from 'path'

// Custom plugin to copy features folder
function copyFeaturesPlugin() {
  return {
    name: 'copy-features',
    writeBundle: async () => {
      const srcDir = path.resolve(__dirname, 'src/features')
      const destDir = path.resolve(__dirname, 'dist/features')

      // Ensure the destination directory exists
      await fs.ensureDir(destDir)

      // Copy the entire features directory
      await fs.copy(srcDir, destDir, {
        recursive: true,
        overwrite: true,
      })
    },
  }
}

export default defineConfig({
  plugins: [copyFeaturesPlugin()],
  server: {
    port: 2345,
    open: true,
    host: true,
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
