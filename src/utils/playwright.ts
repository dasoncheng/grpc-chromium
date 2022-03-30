import { type Browser, chromium } from "playwright";

class Playwright {
  browser: Browser;
  constructor(browser: Browser) {
    this.browser = browser;
  }

  async GetPDF(url: string) {
    console.log("newPage");
    console.time("newPage");
    const page = await this.browser.newPage();
    page.setDefaultTimeout(1000 * 60 * 10);
    console.timeEnd("newPage");
    try {
      console.log("goto");
      console.time("goto");
      await page.goto(url);
      console.timeEnd("goto");

      // console.log("waitForTimeout:prev");
      // console.time("waitForTimeout:prev");
      // await page.waitForTimeout(600);
      // console.timeEnd("waitForTimeout:prev");

      console.log("networkidle");
      console.time("networkidle");
      await page.waitForLoadState("networkidle");
      console.timeEnd("networkidle");

      console.log("waitForTimeout:next");
      console.time("waitForTimeout:next");
      await page.waitForTimeout(2400);
      console.timeEnd("waitForTimeout:next");

      console.log("pdf");
      console.time("pdf");
      await page.emulateMedia({ media: "screen" });
      const buf = await page.pdf({
        format: "A4",
        margin: {
          top: 80,
          bottom: 80,
        },
      });
      console.timeEnd("pdf");

      await page.close();
      return buf;
    } catch (error) {
      await page.close();
      throw error;
    }
  }
}

export async function InitPlayWright(): Promise<Playwright> {
  const browser = await chromium.launch({
    headless: true,
  });
  return new Playwright(browser);
}
