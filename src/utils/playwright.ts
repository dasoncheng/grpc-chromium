import { chromium } from "playwright";

export async function GetPDF(url: string) {
  console.log("launch");
  const browser = await chromium.launch({
    headless: true,
  });
  console.log("newPage");
  const page = await browser.newPage();
  console.log("goto");
  await page.goto(url);
  console.log("pdf");
  await page.waitForTimeout(2000);
  await page.emulateMedia({ media: "screen" });
  const buf = await page.pdf({
    format: "A4",
    margin: {
      top: 80,
      bottom: 80,
    },
  });
  console.log({ buf });
  console.log("close");
  await browser.close();
  console.log("return");
  return buf;
}
