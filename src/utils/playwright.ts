import { type Browser, chromium } from "playwright";
import { nanoid } from "nanoid";

class Playwright {
  timeout = 600;
  browser: Browser;
  constructor(browser: Browser) {
    this.browser = browser;
  }

  async GetPDF(url: string, pathname: string, timeout: number) {
    const CurrentID = nanoid();
    console.log(`newPage-${CurrentID}`);
    console.time(`newPage-${CurrentID}`);
    const page = await this.browser.newPage();
    page.setDefaultTimeout(1000 * (timeout ?? this.timeout));
    console.timeEnd(`newPage-${CurrentID}`);
    try {
      console.log(`goto-${CurrentID}`);
      console.time(`goto-${CurrentID}`);
      await page.goto(url);
      console.timeEnd(`goto-${CurrentID}`);

      if (typeof pathname === "string" && pathname.length > 0) {
        console.log(`waitForURL-${CurrentID}`);
        console.time(`waitForURL-${CurrentID}`);
        await page.waitForURL((currentURL) => {
          return currentURL.pathname.includes(pathname);
        });
        console.timeEnd(`waitForURL-${CurrentID}`);
      }

      console.log(`networkidle-${CurrentID}`);
      console.time(`networkidle-${CurrentID}`);
      await page.waitForLoadState("networkidle");
      console.timeEnd(`networkidle-${CurrentID}`);

      console.log(`waitForTimeout:next-${CurrentID}`);
      console.time(`waitForTimeout:next-${CurrentID}`);
      await page.waitForTimeout(2400);
      console.timeEnd(`waitForTimeout:next-${CurrentID}`);

      console.log(`pdf-${CurrentID}`);
      console.time(`pdf-${CurrentID}`);
      await page.emulateMedia({ media: "screen" });
      const buf = await page.pdf({
        format: "A4",
        margin: {
          top: 80,
          bottom: 80,
        },
      });
      console.timeEnd(`pdf-${CurrentID}`);

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
