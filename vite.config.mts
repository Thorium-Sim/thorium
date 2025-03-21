import {defineConfig, transformWithEsbuild} from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import commonjs from "vite-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  plugins: [
    macrosPlugin(),
    react({
      jsxRuntime: "classic",
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
    svgrPlugin(),
    commonjs(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    proxy: {
      "/assets": "http://localhost:3001",
      "^/(export|import).*": "http://localhost:3001",
      "/upload": "http://localhost:3001",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
