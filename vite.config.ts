import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr()
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
});
