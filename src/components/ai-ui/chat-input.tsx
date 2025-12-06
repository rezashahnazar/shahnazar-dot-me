"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiChat } from "./ai-chat-provider";

type Props = {
  ChatInput: { disclaimerText?: string; className?: string };
  Action: {
    isLoading: boolean;
    stopButtonRef: React.RefObject<HTMLButtonElement | null>;
    onStop: () => void;
    disabled: boolean;
  };
  TextArea: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
    disabled: boolean;
  };
};

export function ChatInput({
  disclaimerText = "پاسخ هوش مصنوعی ممکن است اشتباه باشد.",
  className,
}: Props["ChatInput"]) {
  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
    stop,
    formRef,
    stopButtonRef,
    focusTextarea,
  } = useAiChat();

  return (
    <div
      className={cn(
        "w-full mx-auto shrink-0",
        "px-5 sm:px-5 md:px-6 pb-2 md:pb-3 pt-2",
        className
      )}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onClick={focusTextarea}
        className="flex items-center gap-2 rounded-xl sm:rounded-2xl bg-muted px-3 py-2 shadow-none cursor-text max-w-4xl mx-auto"
      >
        <ChatTextarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <ActionButton
          isLoading={isLoading}
          stopButtonRef={stopButtonRef}
          onStop={stop}
          disabled={!input.trim()}
        />
      </form>
      <ChatDisclaimer text={disclaimerText} />
    </div>
  );
}

function ChatTextarea({
  value,
  onChange,
  onKeyDown,
  disabled,
}: Props["TextArea"]) {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete="off"
      spellCheck="false"
      placeholder="پیام خود را بنویسید..."
      disabled={disabled}
      rows={1}
      enterKeyHint="enter"
      className={cn(
        "flex-1 bg-transparent min-h-[24px] max-h-[100px] sm:max-h-[120px]",
        "text-[16px] sm:text-[14px] leading-[22px] sm:leading-[20px]",
        "text-foreground placeholder:text-muted-foreground/60",
        "border-0 px-1 py-0.5 resize-none",
        "focus-visible:ring-0 focus-visible:ring-offset-0 !shadow-none",
        "transition-[height] duration-100 ease-out",
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-accent/50",
        "[scrollbar-width:thin] [scrollbar-color:hsl(var(--accent))_transparent]"
      )}
    />
  );
}

function ActionButton({
  isLoading,
  stopButtonRef,
  onStop,
  disabled,
}: Props["Action"]) {
  if (isLoading) {
    return (
      <Button
        ref={stopButtonRef as React.RefObject<HTMLButtonElement>}
        type="button"
        variant="ghost"
        size="icon"
        onClick={onStop}
        className={cn(
          "size-[30px] sm:size-7 shrink-0 rounded-lg",
          "bg-destructive/10 hover:bg-destructive/20",
          "text-destructive hover:text-destructive",
          "transition-colors duration-200",
          "ring-1 ring-destructive/40 hover:ring-destructive/60"
        )}
      >
        <div className="size-[11px] sm:size-2.5 bg-current rounded-[2px]" />
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={disabled}
      className="size-[30px] sm:size-7 shrink-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-20 disabled:bg-muted-foreground/30"
    >
      <ArrowUp className="size-[17px] sm:size-4 text-primary-foreground" strokeWidth={2.5} />
    </Button>
  );
}

function ChatDisclaimer({ text }: { text: string }) {
  return (
    <div className="text-center py-2 sm:py-1">
      <span className="text-[10px] text-muted-foreground/50">{text}</span>
    </div>
  );
}
