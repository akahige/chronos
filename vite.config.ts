import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "src/chronos.ts",
      name: "Chronos",
      fileName: (format) => `Chronos.${format}.js`,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests-setup.ts",
  },
});
