import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // /about -> /about/index.html so URLs stay clean (no .html extension).
    dirStyle: 'nested',
    formatting: 'none',
  },
  ssr: {
    // Bundle MUI/Emotion into the SSR build so Node doesn't try to resolve
    // their ESM directory imports (avoids ERR_UNSUPPORTED_DIR_IMPORT).
    noExternal: [/@mui\//, /@emotion\//],
  },
})
