import { handleUnaryCall } from "@grpc/grpc-js";
import { GetPDF } from "../utils/playwright";
import { Html2PdfRequest, Html2PdfResponse } from "../../packages/grpc/grpc-playwright_pb";

export const html2Pdf: handleUnaryCall<Html2PdfRequest, Html2PdfResponse> = async (call, callback) => {
  const reply = new Html2PdfResponse();
  const buf = await GetPDF(call.request.getUrl());
  reply.setPdf(buf);
  callback(null, reply);
};
