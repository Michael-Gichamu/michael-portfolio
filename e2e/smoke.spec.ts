import { test, expect } from "@playwright/test";

test.describe("Portfolio smoke", () => {
  test("home page loads with correct title and hero content", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Michael Gichamu/);
    // Hero headline (uses Instrument Serif italic accent on the closing line)
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Software Engineer");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("AI Automation Specialist");
  });

  test("primary nav links reach every section", async ({ page }) => {
    await page.goto("/");

    const sectionIds = ["about", "work", "skills", "experience", "credentials", "contact"];
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("AI-Augmented Troubleshooting is the first project", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();
    const projectTitles = page.locator("#work h3");
    await expect(projectTitles.first()).toContainText("AI-Augmented Troubleshooting System");
  });

  test("contact form is present and submits without opening a mail client", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    // Mock the Web3Forms API so no real network request is made in CI.
    // The build embeds a placeholder key (see playwright.config.ts webServer.env)
    // so the form bypasses the early-return guard and reaches the fetch call.
    await page.route("https://api.web3forms.com/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByPlaceholder("Your name").fill("Test User");
    await page.getByPlaceholder("Email").fill("test@example.com");
    await page.getByPlaceholder("What are you building?").fill("E2E test message");

    // Watch for any navigation away from the page — there should be none.
    let navigated = false;
    page.on("framenavigated", () => {
      navigated = true;
    });

    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByRole("button", { name: /sent ✓/i })).toBeVisible({ timeout: 3_000 });

    expect(navigated).toBe(false);
  });

  test("certificate cards link out to verifiable URLs", async ({ page }) => {
    await page.goto("/");
    await page.locator("#credentials").scrollIntoViewIfNeeded();

    const links = page.locator("#credentials a[href^='https']");
    await expect(links).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
    }
  });
});
