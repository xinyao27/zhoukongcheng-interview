import { useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

interface ChatMessageProps {
  role: "user" | "assistant" | "system" | "data";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      const codeBlocks = messageRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        const button = document.createElement("button");
        button.className =
          "copy-button absolute top-2 right-2 p-2 bg-gray-700 rounded text-white text-sm";
        button.textContent = "复制";
        button.onclick = () => {
          navigator.clipboard.writeText(block.textContent || "");
          button.textContent = "已复制!";
          setTimeout(() => {
            button.textContent = "复制";
          }, 2000);
        };
        (block.parentElement as HTMLElement).style.position = "relative";
        block.parentElement?.appendChild(button);
      });
    }
  }, [content]);

  return (
    <div
      className={cn("px-4 py-6", role === "user" ? "bg-gray-50" : "bg-white")}
    >
      <div className="max-w-3xl mx-auto">
        <div className="font-semibold mb-2">
          {role === "user" ? "你" : "AI助手"}
        </div>
        <div
          ref={messageRef}
          className={cn(
            "prose prose-sm max-w-none",
            isLoading && "animate-pulse"
          )}
          dangerouslySetInnerHTML={{
            __html: md.render(content),
          }}
        />
      </div>
    </div>
  );
}
