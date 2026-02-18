import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";
import type { InlineConfig } from "vitest";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
} as VitestConfigExport);
