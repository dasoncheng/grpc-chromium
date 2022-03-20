import { writeFile } from "fs/promises";
import { credentials } from "@grpc/grpc-js";
import { Html2PdfRequest } from "../packages/grpc/grpc-playwright_pb";
import { GrpcPlaywrightClient } from "../packages/grpc/grpc-playwright_grpc_pb";

async function application() {
  await Promise.resolve();
  const client = new GrpcPlaywrightClient("localhost:3000", credentials.createInsecure());
  const request = new Html2PdfRequest();
  request.setUrl("https://page.xinluomed.com/test/afc/#/quality-control");
  client.html2Pdf(request, (err, res) => {
    const buf = res.getPdf_asU8();
    writeFile("abc.pdf", buf);
  });
}

application().catch((err) => {
  console.log("application: ", err);
});
