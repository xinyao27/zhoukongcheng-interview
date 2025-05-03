import { createDeepSeek } from "@ai-sdk/deepseek";
import { createQwen } from "qwen-ai-provider";
import { generateText } from "ai";

const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});
const qwen = createQwen({
  apiKey: process.env.DASHSCOPE_API_KEY,
});
console.log("deepseek", deepSeek, qwen);
export async function POST(req: Request) {
  console.log(
    "key",
    process.env.DEEPSEEK_API_KEY,
    process.env.DASHSCOPE_API_KEY
  );
  const { messages } = await req.json();
  console.log("messages", messages);
  const result = await generateText({
    model: qwen("qwen-plus"), //deepSeek.chat("deepseek-chat"),
    prompt: "hello",
  });
  // const res = await deepSeek.chat('deepseek-chat').streamText({});
  // console.log("res", result, result.toDataStreamResponse());
  console.log("res", result, result.text);
  return result.text;
}
