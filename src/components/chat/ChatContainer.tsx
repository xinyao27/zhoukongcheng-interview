import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatContainer() {
  const { messages, handleSubmit, isLoading, stop, input, handleInputChange } =
    useChat({
      api: "/api/chat",
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="pb-[200px]">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              isLoading={
                isLoading &&
                message.role === "assistant" &&
                messages[messages.length - 1].id === message.id
              }
            />
          ))}
        </div>
      </ScrollArea>
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <ChatInput
          onSubmit={(input) =>
            handleSubmit({
              messages: [...messages, { role: "user", content: input }],
            })
          }
          onStop={stop}
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
