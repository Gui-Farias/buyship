import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.spec\.ts/,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
  },
});