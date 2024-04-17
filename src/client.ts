import { writeFile } from "fs/promises";
import { credentials } from "@grpc/grpc-js";
import { Html2PdfRequest } from "../packages/grpc/grpc-chromium_pb";
import { GrpcChromiumClient } from "../packages/grpc/grpc-chromium_grpc_pb";

async function application() {
  await Promise.resolve();
  const client = new GrpcChromiumClient("localhost:3000", credentials.createInsecure());
  const now = Date.now();
  [
    {
      name: `${now}A`,
      url: "https://baidu.com",
    },
    {
      name: `${now}B`,
      url: "https://baidu.com",
    },
    {
      name: `${now}C`,
      url: "https://baidu.com",
    },
  ].forEach(({ name, url }) => {
    const request = new Html2PdfRequest();
    request.setUrl(url);
    // 有页面跳转或重定向时，设置location.pathname的匹配字符串
    // request.setPathname("pathname");
    // 设置页面超时时间，单位秒，默认600秒（10分钟）
    // request.setTimeout(1200);
    console.time(`pdf-${name}`);
    client.html2Pdf(request, (err, res) => {
      if (err) {
        console.log("html2Pdf");
        console.log(err);
        return;
      }
      const buf = res.getPdf_asU8();
      console.timeEnd(`pdf-${name}`);
      writeFile(`docs/${name}.pdf`, buf);
    });
  });
}

application().catch((err) => {
  console.log("application: ", err);
});
