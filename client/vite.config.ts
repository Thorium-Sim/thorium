import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import svgr from "vite-plugin-svgr";
import macros from "vite-plugin-babel-macros";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svgr(),
    macros(),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  esbuild: {
    loader: "tsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },

      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
