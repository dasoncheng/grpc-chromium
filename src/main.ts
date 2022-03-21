import { Server, ServerCredentials } from "@grpc/grpc-js";
import { GrpcChromiumService } from "../packages/grpc/grpc-chromium_grpc_pb";
import { html2Pdf } from "./services/grpc-chromium";

async function application() {
  await Promise.resolve();
  const server = new Server();
  server.addService(GrpcChromiumService, {
    html2Pdf,
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
