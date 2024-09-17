import { BaselimeLogger } from "@baselime/edge-logger";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function logInfo(namespace: string, message: string) {
  try {
    const logger = new BaselimeLogger({
      service: "action-tracker",
      namespace,
      apiKey: process.env.BASELIME_API_KEY!,
      ctx: getRequestContext().ctx,
    });

    logger.info(message);
    getRequestContext().ctx.waitUntil(logger.flush());
  } catch (error: any) {
    console.error(error.message);
  }
}
