import { expect, test } from "@playwright/test";

test("public homepage renders hero, listings and footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Eat something extraordinary." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Menu", exact: true })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await page.screenshot({ path: "test-results/home.png", fullPage: true });
});

test("category pills filter the menu grid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Menu categories" }).getByRole("button", { name: "Postres" }).click();
  await expect(page.getByRole("heading", { name: /Churros/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tamarindo/ })).toHaveCount(0);
});

test("menu cards add items to the cart", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Add Agua de Tamarindo to cart" });
  await button.click();
  await expect(button).toHaveAttribute("title", "Added");
});

test("navbar search filters the menu", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search the menu" }).click();
  await page.getByRole("searchbox", { name: "Search the menu" }).fill("birria");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\?q=birria/);
  await expect(page.getByRole("heading", { name: /Birria Tacos/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tamarindo/ })).toHaveCount(0);
});

test("admin login is reachable from the footer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Admin login" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
});

test("dashboard redirects unauthenticated visitors to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("footer theme switch toggles light/dark and persists", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await page.getByRole("radio", { name: "Light" }).click();
  await expect(html).not.toHaveClass(/dark/);
  await page.reload();
  await expect(html).not.toHaveClass(/dark/);
  await page.getByRole("radio", { name: "Dark" }).click();
  await expect(html).toHaveClass(/dark/);
});
