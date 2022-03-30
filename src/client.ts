import { writeFile } from "fs/promises";
import { credentials } from "@grpc/grpc-js";
import { Html2PdfRequest } from "../packages/grpc/grpc-chromium_pb";
import { GrpcChromiumClient } from "../packages/grpc/grpc-chromium_grpc_pb";

async function application() {
  await Promise.resolve();
  const client = new GrpcChromiumClient("123.60.73.159:3001", credentials.createInsecure());
  const request = new Html2PdfRequest();
  request.setUrl(
    "https://page.xinluomed.com/afc/#/sign?from=%2Fquality-control&secret=dVh3xnVmQd%2BaXbrL7yPzHaPpsN4wY0WnflaJli3WtF%2FtzhVGC2HaSzwVQ1k4BgXGUra9nZYTIjd3u0ofK0v%2B7b7j061KQ%2FNPdW1v5NjzfPHWqmhitQ2b4NdSwfyH5aJlhe0Lqq8rPQ0atbkRpnk9g42rfPHoojXv7PnaP2hMluOU0TdBHTU1c4ATCZNk%2BM4YpHv9XEcQ7U7c%2FA6vatFNNg%3D%3D"
  );
  console.time("pdf");
  client.html2Pdf(request, (err, res) => {
    if (err) {
      console.log("html2Pdf");
      console.log(err);
      return;
    }
    const buf = res.getPdf_asU8();
    console.timeEnd("pdf");
    writeFile(`docs/D${Date.now()}.pdf`, buf);
  });
}

application().catch((err) => {
  console.log("application: ", err);
});
