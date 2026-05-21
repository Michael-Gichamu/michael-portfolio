import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3100;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Playwright runs against a production build started by the webServer
 * config below. That keeps the test environment realistic and fast.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Reduce flake from animations in CI
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: BASE_URL,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    // Embed a non-empty placeholder key at build time so the contact form
    // proceeds past the early-return guard. The actual API call is mocked
    // in the E2E test via page.route(), so no real email is ever sent.
    env: {
      NEXT_PUBLIC_WEB3FORMS_KEY:
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "e2e_test_placeholder",
    },
  },
});
