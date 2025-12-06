"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AiChatProvider } from "@/components/ai-ui/ai-chat-provider";
import { MessageList } from "@/components/ai-ui/message-list";
import { ChatInput } from "@/components/ai-ui/chat-input";
import { Button } from "@/components/ui/button";
import { Bot, X, Sparkles } from "lucide-react";
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

function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = (gy <= 1600) ? 0 : 979;
  gy -= (gy <= 1600) ? 621 : 1600;
  const gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) 
           + (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
  jy += 33 * (Math.floor(days / 12053));
  days %= 12053;
  jy += 4 * (Math.floor(days / 1461));
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;
  const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
  return [jy, jm, jd];
}

function formatJalaliDateTime(): string {
  const now = new Date();
  const [jy, jm, jd] = gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  const jalaliMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const persianDays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
  const toPersianNum = (n: number) => n.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  
  const dayName = persianDays[now.getDay()];
  const date = toPersianNum(jd);
  const month = jalaliMonths[jm - 1];
  const year = toPersianNum(jy);
  const hours = toPersianNum(now.getHours());
  const minutes = toPersianNum(now.getMinutes()).padStart(2, "۰");
  
  return `${dayName}، ${date} ${month} ${year}، ساعت ${hours}:${minutes}`;
}

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
  
  const currentDateTime = formatJalaliDateTime();

  return `
اطلاعات درباره ${name} (${nameEn}):

زمان فعلی: ${currentDateTime}

تاریخ تولد: ${birthDate.dayFa} ${birthDate.monthFa} ${birthDate.yearFa} (${birthDate.month} ${birthDate.day}, ${birthDate.year})
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

نکته مهم: همیشه از تقویم جلالی (شمسی) برای نمایش تاریخ‌ها استفاده کن. تاریخ تولد در تقویم شمسی ۸ آبان ۱۳۷۰ است.
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
        <div className="fixed z-50 bottom-6 right-6 group">
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Outer ring with subtle animation */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Button
            onClick={() => setIsOpen(true)}
            className={cn(
              "relative",
              "size-14 rounded-full",
              "bg-gradient-to-br from-primary via-primary to-primary/80",
              "shadow-[0_8px_32px_-4px] shadow-primary/30",
              "group-hover:shadow-[0_12px_40px_-4px] group-hover:shadow-primary/50",
              "border border-white/10",
              "transition-all duration-500 ease-out",
              "group-hover:scale-110 active:scale-95",
              "overflow-hidden"
            )}
          >
            {/* Inner shine effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/15 rounded-full" />
            
            {/* Animated background shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            {/* Single Bot icon */}
            <Bot className={cn(
              "size-6 text-primary-foreground relative z-10",
              "transition-transform duration-300 ease-out",
              "group-hover:scale-110"
            )} />
          </Button>
          
          {/* Tooltip */}
          <div className={cn(
            "absolute -top-12 left-1/2 -translate-x-1/2",
            "px-3 py-1.5 rounded-lg",
            "bg-foreground/95 text-background backdrop-blur-sm",
            "text-xs font-medium whitespace-nowrap",
            "opacity-0 scale-90 translate-y-2",
            "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0",
            "transition-all duration-300 delay-150 pointer-events-none",
            "shadow-xl"
          )}>
            گفتگو با دستیار هوشمند
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-foreground/95" />
          </div>
        </div>
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
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const preventScrollPropagation = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest("[data-scroll-container]") || panel;
      const isScrollable = scrollableParent.scrollHeight > scrollableParent.clientHeight;
      
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      }
    };

    panel.addEventListener("wheel", preventScrollPropagation, { passive: false });
    return () => panel.removeEventListener("wheel", preventScrollPropagation);
  }, []);

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed z-50 bottom-6 right-6",
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
          disclaimerText="پاسخ‌های هوش مصنوعی ممکن است غیر دقیق باشد."
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartY = React.useRef(0);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 100) {
      setIsOpen(false);
    }
    setDragOffset(0);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in-0 duration-200"
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={containerRef}
        style={{
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[200]",
          "h-[100dvh] pt-[env(safe-area-inset-top)]",
          "flex flex-col",
          "bg-background",
          "animate-in slide-in-from-bottom duration-300"
        )}
      >
        <div 
          className="flex justify-center pt-3 pb-2 shrink-0 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 shrink-0">
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

        <AiChatProvider api="/api/chat" pageContent={pageContext}>
          <MessageList className="flex-1 min-h-0 overflow-y-auto" />
          <ChatInput 
            disclaimerText="پاسخ‌های هوش مصنوعی ممکن است غیر دقیق باشد."
          />
        </AiChatProvider>
      </div>
    </>
  );
}

