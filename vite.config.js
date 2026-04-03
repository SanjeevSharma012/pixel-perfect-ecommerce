import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 5180,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["*"],
      credentials: true
    },
=======
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64
    hmr: {
      overlay: false,
    },
  },
<<<<<<< HEAD
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src-js"),
    },
  },
});

=======
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64
