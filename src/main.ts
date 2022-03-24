import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { Html2PdfRequest, Html2PdfResponse } from "../packages/grpc/grpc-chromium_pb";
import { GrpcChromiumService } from "../packages/grpc/grpc-chromium_grpc_pb";
import { InitPlayWright } from "./utils/playwright";

async function application() {
  const playwright = await InitPlayWright();
  const server = new Server();
  server.addService(GrpcChromiumService, {
    html2Pdf: async (
      call: ServerUnaryCall<Html2PdfRequest, Html2PdfResponse>,
      callback: sendUnaryData<Html2PdfResponse>
    ) => {
      try {
        const reply = new Html2PdfResponse();
        const buf = await playwright.GetPDF(call.request.getUrl());
        reply.setPdf(buf);
        callback(null, reply);
      } catch (error) {
        callback(new Error("PDF生成失败"));
      }
    },
  });
  server.bindAsync("0.0.0.0:3000", ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.log("bindAsync: ", err);
      return;
    }
    server.start();
    console.log("start at: ", port);
  });
}

application().catch((err) => {
  console.log("application: ", err);
});
