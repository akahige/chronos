import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Chronos",
      fileName: (format) => `Chronos.${format}.js`,
    },
    rollupOptions: {
      output: { exports: "named" },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests-setup.ts",
  },
});
