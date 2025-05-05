import { createDeepSeek } from "@ai-sdk/deepseek";
import { createQwen } from "qwen-ai-provider";
import { createZhipu } from "zhipu-ai-provider";
import { streamText } from "ai";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "../../../db";
import { nanoid } from "nanoid";

const app = new Hono().basePath("/api");

const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});
const qwen = createQwen({
  apiKey: process.env.DASHSCOPE_API_KEY,
});
const zhiPu = createZhipu({
  apiKey: process.env.ZHIPU_API_KEY,
});
console.log("deepseek", deepSeek, qwen);
// export async function POST(req: Request) {
//   console.log(
//     "key",
//     process.env.DEEPSEEK_API_KEY,
//     process.env.DASHSCOPE_API_KEY
//   );
//   const { messages } = await req.json();
//   console.log("messages", messages);
//   const result = await streamText({
//     model: zhiPu("glm-4-plus"), //qwen("qwen-plus"), //deepSeek.chat("deepseek-chat"),
//     // prompt: "hello",
//     messages,
//   });
//   // const res = await deepSeek.chat('deepseek-chat').streamText({});
//   // console.log("res", result, result.toDataStreamResponse());
//   // console.log("res", result, result.text);
//   return result.toDataStreamResponse();
// }

app.post("/agent", async (c) => {
  const { messages } = await c.req.json();
  const result = await streamText({
    model: zhiPu("glm-4-plus"), //qwen("qwen-plus"), //deepSeek.chat("deepseek-chat"),
    // prompt: "hello",
    messages,
  });
  // const res = await deepSeek.chat('deepseek-chat').streamText({});
  // console.log("res", result, result.toDataStreamResponse());
  // console.log("res", result, result.text);
  const conversationId = nanoid();
  // await db.insert(messages).values({
  //   id: nanoid(),
  //   content: "",
  //   role: "assistant",
  //   conversationId,
  // });
  console.log("con", conversationId, db);
  return result.toDataStreamResponse();
});

export const POST = handle(app);
