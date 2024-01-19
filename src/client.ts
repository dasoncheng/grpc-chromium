import { writeFile } from "fs/promises";
import { credentials } from "@grpc/grpc-js";
import { Html2PdfRequest } from "../packages/grpc/grpc-chromium_pb";
import { GrpcChromiumClient } from "../packages/grpc/grpc-chromium_grpc_pb";

async function application() {
  await Promise.resolve();
  const client = new GrpcChromiumClient("localhost:3000", credentials.createInsecure());
  const request = new Html2PdfRequest();
  request.setUrl("https://baidu.com");
  // 有页面跳转或重定向时，设置location.pathname的匹配字符串
  // request.setPathname("pathname");
  // 设置页面超时时间，单位秒，默认600秒（10分钟）
  // request.setTimeout(1200);
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
