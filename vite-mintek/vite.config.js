import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // Modern baseline drops legacy transforms/polyfills (Lighthouse
    // "Legacy JavaScript" audit). es2020 is widely supported by all evergreen
    // browsers and safe for our deploy target.
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split heavy vendors into their own long-term-cacheable chunks so app
        // code changes don't invalidate them. Client build only: in the SSR
        // build several of these deps are external, which rollup forbids in
        // manualChunks. A function keeps the split simple and robust.
        manualChunks: isSsrBuild
          ? undefined
          : (id) => {
              if (!id.includes('node_modules')) return
              if (id.includes('@mui') || id.includes('@emotion')) return 'mui'
              if (id.includes('@amplitude')) return 'amplitude'
            },
      },
    },
  },
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
}))
