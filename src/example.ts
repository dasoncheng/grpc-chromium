import { writeFile } from "fs/promises";
import { GetPDF } from "./utils/playwright";

async function application() {
  const buf = await GetPDF("http://localhost:3000/#/quality-control");

  writeFile(`docs/D${Date.now()}.pdf`, buf);
}

application().catch();
