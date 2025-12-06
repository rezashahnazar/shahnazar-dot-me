"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground hover:text-foreground",
          "bg-transparent hover:bg-foreground/5",
          "transition-all duration-300"
        )}
        aria-label="تغییر تم"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
        "text-muted-foreground hover:text-foreground",
        "bg-transparent hover:bg-foreground/5",
        "transition-all duration-300",
        "group"
      )}
      aria-label="تغییر تم"
    >
      <Sun className={cn(
        "h-4 w-4 transition-all duration-300",
        resolvedTheme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
      )} />
      <Moon className={cn(
        "absolute h-4 w-4 transition-all duration-300",
        resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
      )} />
    </button>
  );
}
