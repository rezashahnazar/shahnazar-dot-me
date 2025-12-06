"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label?: string;
  isActive: boolean;
  showLabel?: boolean;
}

function NavItem({ href, icon, label, isActive, showLabel = true }: NavItemProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const Component = isExternal ? "a" : Link;
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      href={href}
      {...externalProps}
      className={cn(
        "relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-md text-sm transition-all duration-200",
        "hover:bg-muted/60",
        "focus-ring",
        isActive && "bg-muted text-foreground",
        !isActive && "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="relative z-10">{icon}</span>
      {showLabel && label && (
        <span className="relative z-10 hidden xs:inline sm:inline font-medium text-xs sm:text-sm">{label}</span>
      )}
    </Component>
  );
}

function toPersianNumbers(str: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

function TimeDisplay({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(toPersianNumbers(timeString));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  if (!mounted) return <span className="text-xs text-muted-foreground/70 tabular-nums font-medium w-10">--:--</span>;

  return (
    <span className="text-xs text-muted-foreground/70 tabular-nums font-medium">
      {time}
    </span>
  );
}

function Separator() {
  return (
    <div className="w-px h-4 sm:h-5 bg-border/40" />
  );
}

export function FloatingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top fade gradient */}
      <div className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-gradient-to-b from-background via-background/80 to-transparent z-40 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
        {/* Location & Time - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground/70">
          <span className="font-medium">{siteConfig.location.city}</span>
          <Separator />
          <TimeDisplay timeZone={siteConfig.location.timezone} />
        </div>

        {/* Main Navigation */}
        <motion.nav
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className={cn(
            "flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-1 rounded-lg",
            "bg-background/85 backdrop-blur-md",
            "border border-border/40",
            "shadow-sm",
            "transition-all duration-300",
            scrolled && "shadow-md border-border/50"
          )}
        >
          <NavItem
            href="/"
            icon={<Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            isActive={pathname === "/"}
            showLabel={false}
          />

          <NavItem
            href={`mailto:${siteConfig.social.email}`}
            icon={<Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            label="تماس"
            isActive={false}
          />

          <Separator />

          <ThemeToggle />
        </motion.nav>

        {/* Social Links - Hidden on mobile, shown on tablet and up */}
        <div className="hidden md:flex items-center gap-0.5 sm:gap-1">
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-2 rounded-md",
              "text-muted-foreground/60 hover:text-foreground",
              "hover:bg-muted/50",
              "transition-all duration-200",
              "focus-ring"
            )}
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-2 rounded-md",
              "text-muted-foreground/60 hover:text-foreground",
              "hover:bg-muted/50",
              "transition-all duration-200",
              "focus-ring"
            )}
          >
            <Linkedin className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Bottom fade gradient - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 h-12 sm:h-14 bg-gradient-to-t from-background via-background/80 to-transparent z-40 pointer-events-none md:hidden" />
    </>
  );
}
