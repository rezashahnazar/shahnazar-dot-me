"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AiChatProvider } from "@/components/ai-ui/ai-chat-provider";
import { MessageList } from "@/components/ai-ui/message-list";
import { ChatInput } from "@/components/ai-ui/chat-input";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Drawer } from "vaul";
import { siteConfig } from "@/config/site";

// Hook to detect mobile viewport
function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

// Generate context from siteConfig
function generateChatContext(): string {
  const { name, nameEn, title, description, skills, experiences, education, publications, books, teaching, birthDate } = siteConfig;
  
  const skillsList = skills.map(s => s.name).join("، ");
  
  const experiencesList = experiences.map(exp => 
    `- ${exp.title} در ${exp.company} (${exp.period}): ${exp.description}`
  ).join("\n");
  
  const educationList = education.map(edu => 
    `- ${edu.degree} از ${edu.university} (${edu.period})`
  ).join("\n");
  
  const publicationsList = publications.map(pub => 
    `- ${pub.title} (${pub.publisher}, ${pub.year})`
  ).join("\n");
  
  const booksList = books.map(book => 
    `- ${book.title} (${book.publisher}, ${book.period})`
  ).join("\n");
  
  const teachingList = teaching.map(t => 
    `- ${t.role} در ${t.institution} (${t.period})`
  ).join("\n");

  return `
اطلاعات درباره ${name} (${nameEn}):

تاریخ تولد: ${birthDate.monthFa} ${birthDate.yearFa} (${birthDate.month} ${birthDate.year})
عنوان: ${title}
توضیحات: ${description}

مهارت‌ها: ${skillsList}

سوابق حرفه‌ای:
${experiencesList}

تحصیلات:
${educationList}

مقالات علمی:
${publicationsList}

کتاب‌ها:
${booksList}

سوابق تدریس:
${teachingList}

لینک‌های اجتماعی:
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
- Google Scholar: ${siteConfig.social.googleScholar}
- Email: ${siteConfig.social.email}
`.trim();
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = useIsMobile();
  const pageContext = React.useMemo(() => generateChatContext(), []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop: Side Panel */}
      {!isMobile && (
        <DesktopChatPanel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pageContext={pageContext}
        />
      )}

      {/* Mobile: Bottom Sheet */}
      {isMobile && (
        <MobileChatSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pageContext={pageContext}
        />
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed z-50",
            "bottom-6 left-6",
            "size-14 rounded-full",
            "bg-primary hover:bg-primary/90",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "group"
          )}
        >
          <MessageCircle className="size-6 text-primary-foreground group-hover:hidden" />
          <Sparkles className="size-6 text-primary-foreground hidden group-hover:block" />
        </Button>
      )}
    </>
  );
}

function DesktopChatPanel({
  isOpen,
  setIsOpen,
  pageContext,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageContext: string;
}) {
  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      onWheel={handleWheel}
      className={cn(
        "fixed z-50 bottom-6 left-6",
        "w-[420px] h-[600px] max-h-[80vh]",
        "bg-background border border-border/50",
        "rounded-2xl shadow-2xl",
        "flex flex-col overflow-hidden",
        "transition-all duration-300 ease-out",
        "overscroll-contain",
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="size-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">دستیار هوشمند</h3>
            <p className="text-xs text-muted-foreground">درباره من بپرسید</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="size-8 rounded-full hover:bg-muted"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Chat Content */}
      <AiChatProvider api="/api/chat" pageContent={pageContext}>
        <MessageList className="flex-1" />
        <ChatInput 
          disclaimerText="پاسخ‌های هوش مصنوعی ممکن است غیر دقیق باشند."
          className=""
        />
      </AiChatProvider>
    </div>
  );
}

function MobileChatSheet({
  isOpen,
  setIsOpen,
  pageContext,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageContext: string;
}) {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="bottom"
      dismissible
    >
      <Drawer.Portal>
        {/* Overlay */}
        <Drawer.Overlay
          className={cn(
            "fixed inset-0 bg-black/60 z-[100]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />

        {/* Content */}
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[200]",
            "h-[85dvh] flex flex-col",
            "bg-background rounded-t-[20px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            "duration-300"
          )}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>

          {/* Title for accessibility */}
          <Drawer.Title className="sr-only">دستیار هوشمند</Drawer.Title>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">دستیار هوشمند</h3>
                <p className="text-xs text-muted-foreground">درباره من بپرسید</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-9 rounded-full hover:bg-muted"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Chat Content */}
          <AiChatProvider api="/api/chat" pageContent={pageContext}>
            <MessageList className="flex-1" />
            <ChatInput 
              disclaimerText="پاسخ‌های هوش مصنوعی ممکن است غیر دقیق باشند."
            />
          </AiChatProvider>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

