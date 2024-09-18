import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from "vite-plugin-babel-macros"
import tsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [ 
    macrosPlugin(),
  react(
    {jsxRuntime: 'classic'}

  ), tsconfigPaths(), svgrPlugin()],
  build:{
    assetsDir:"build"
  },
  server:{
    port:3000,
    proxy: {
      "/assets":"http://localhost:3001",
      "^/(export|import).*":"http://localhost:3001",
      "/upload":"http://localhost:3001"
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  }
})