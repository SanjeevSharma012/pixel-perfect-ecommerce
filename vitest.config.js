import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src-js/test/setup.js"],
    include: ["src-js/**/*.{test,spec}.js"],
  },
  resolve: {
    alias: { "@": path.resolve(process.cwd(), "./src-js") },
  },
});
