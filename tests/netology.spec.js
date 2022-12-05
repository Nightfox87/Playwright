const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require("../user");

test("successfullLogin", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const page = await browser.newPage();
  (await page).goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByRole("heading", { name: "Мои курсы и профессии" }))
    .toBeVisible;
});

test("failedLogin", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const page = await browser.newPage();
  (await page).goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("kkkk@kkkk.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("qwerty");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible;
});
