import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);
  const result = await streamText({
    model: deepSeek("deepseek-chat"),
    // messages,
    prompt: "hello",
  });
  return result.toDataStreamResponse();
}
