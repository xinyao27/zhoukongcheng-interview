import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, StopCircle } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export function ChatInput({
  onSubmit,
  onStop,
  isLoading,
  input,
  handleInputChange,
}: ChatInputProps) {
  // const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input);
    // setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t">
      <Textarea
        ref={textareaRef}
        value={input}
        // onChange={(e) => setInput(e.target.value)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="输入消息..."
        className="min-h-[60px] max-h-[200px] resize-none"
        disabled={isLoading}
      />
      {isLoading ? (
        <Button
          variant="destructive"
          size="icon"
          onClick={onStop}
          className="flex-shrink-0"
        >
          <StopCircle className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={!input.trim()}
          size="icon"
          className="flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
