import { type Browser, chromium } from "playwright";

class Playwright {
  browser: Browser;
  constructor(browser: Browser) {
    this.browser = browser;
  }

  async GetPDF(url: string) {
    console.log("newPage");
    const page = await this.browser.newPage();
    console.log("goto");
    await page.goto(url);
    await page.waitForTimeout(600);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2400);
    console.log("pdf");
    await page.emulateMedia({ media: "screen" });
    const buf = await page.pdf({
      format: "A4",
      margin: {
        top: 80,
        bottom: 80,
      },
    });
    console.log("close");
    await page.close();
    console.log("return");
    return buf;
  }
}

export async function InitPlayWright(): Promise<Playwright> {
  const browser = await chromium.launch({
    headless: true,
  });
  return new Playwright(browser);
}
