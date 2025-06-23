import { chromium, Browser, Page, expect } from '@playwright/test';

export let browser: Browser;
export let page: Page;

export async function openMainSite(): Promise<{ browser: Browser; page: Page }> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://bonigarcia.dev/selenium-webdriver-java/');

  const introText = 'This site contains a collection of sample web pages to be tested with Selenium WebDriver.';
  await expect(page.locator('p.lead')).toContainText(introText);

  return { browser, page };
}
