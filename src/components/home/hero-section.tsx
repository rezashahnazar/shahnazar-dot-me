"use client";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { RevealFx, StaggerChildren, StaggerItem } from "@/components/effects/reveal-fx";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, ExternalLink, Github, Linkedin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileImage = mounted && resolvedTheme === "light" 
    ? "/profile-image-light.png" 
    : "/profile-image.png";

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[80vh] flex flex-col items-center justify-center section-padding-x py-20 sm:py-24 md:py-32">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 sm:h-24 md:h-32 bg-gradient-to-b from-transparent via-border/50 to-border/80" />
      
      <div className="container-default flex flex-col items-center text-center">
        {/* Avatar with elegant modern design */}
        <RevealFx delay={0} translateY={8}>
          <div className="relative mb-10 sm:mb-12 md:mb-14 group">
            {/* Subtle ambient glow */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-b from-muted-foreground/[0.03] via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Main container */}
            <div className="relative">
              {/* Outer subtle border */}
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-b from-border/30 via-border/10 to-transparent" />
              
              <Avatar className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-muted/50">
                <AvatarImage 
                  src={profileImage}
                  alt={siteConfig.name} 
                  className="object-cover grayscale-[0.1] contrast-[1.02]" 
                />
                <AvatarFallback className="text-2xl sm:text-3xl font-semibold bg-muted text-muted-foreground">
                  RS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </RevealFx>

        {/* Name Section */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <RevealFx delay={0.1} translateY={12}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </h1>
          </RevealFx>

          <RevealFx delay={0.15} translateY={12}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 font-medium tracking-wide" dir="ltr">
              {siteConfig.nameEn}
            </p>
          </RevealFx>
        </div>

        {/* Titles */}
        <RevealFx delay={0.2} translateY={16}>
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg md:text-xl font-medium" dir="ltr">
              <span className="text-foreground">Cardiologist, MD</span>
              <span className="text-muted-foreground/30">|</span>
              <span className="text-foreground">Software Engineer</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground/60 font-medium">
              مدال طلای المپیاد زیست‌شناسی ایران
            </div>
          </div>
        </RevealFx>

        {/* Subtitle */}
        <RevealFx delay={0.25} translateY={20}>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 max-w-md sm:max-w-lg md:max-w-xl leading-relaxed mb-8 sm:mb-10 md:mb-12">
            دانش‌آموخته دانشگاه علوم پزشکی تهران، مرکز قلب تهران
          </p>
        </RevealFx>

        {/* Skills */}
        <RevealFx delay={0.3} translateY={24}>
          <StaggerChildren 
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 md:mb-14 max-w-lg sm:max-w-xl md:max-w-2xl" 
            staggerDelay={0.04} 
            initialDelay={0.05}
          >
            {siteConfig.skills.map((skill) => (
              <StaggerItem key={skill.name}>
                <span
                  className={cn(
                    "tag",
                    "px-3 py-1.5 sm:px-3.5 sm:py-2",
                    "text-[11px] sm:text-xs",
                    "hover:bg-muted/80 hover:text-foreground/90",
                    "transition-all duration-200"
                  )}
                >
                  {skill.name}
                </span>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </RevealFx>

        {/* CTA Buttons */}
        <RevealFx delay={0.35} translateY={28}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
            <Link href={`mailto:${siteConfig.social.email}`}>
              <Button
                variant="outline"
                size="default"
                className={cn(
                  "h-10 sm:h-11 px-4 sm:px-5",
                  "border-border/60 hover:border-border",
                  "bg-background/50 hover:bg-muted/60",
                  "text-foreground/90 hover:text-foreground",
                  "font-medium text-sm",
                  "transition-all duration-300",
                  "hover-lift"
                )}
              >
                <Mail className="w-4 h-4 ml-2" />
                تماس
              </Button>
            </Link>

            <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "h-10 sm:h-11 px-3 sm:px-4",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted/50",
                  "font-medium text-sm",
                  "transition-all duration-300",
                  "hover-lift"
                )}
              >
                <Github className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">GitHub</span>
                <ExternalLink className="w-3 h-3 mr-1 opacity-40" />
              </Button>
            </Link>

            <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "h-10 sm:h-11 px-3 sm:px-4",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted/50",
                  "font-medium text-sm",
                  "transition-all duration-300",
                  "hover-lift"
                )}
              >
                <Linkedin className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">LinkedIn</span>
                <ExternalLink className="w-3 h-3 mr-1 opacity-40" />
              </Button>
            </Link>

            <Link href={siteConfig.social.googleScholar} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "h-10 sm:h-11 px-3 sm:px-4",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted/50",
                  "font-medium text-sm",
                  "transition-all duration-300",
                  "hover-lift"
                )}
              >
                <GraduationCap className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">Scholar</span>
                <ExternalLink className="w-3 h-3 mr-1 opacity-40" />
              </Button>
            </Link>
          </div>
        </RevealFx>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 sm:h-20 md:h-24 bg-gradient-to-t from-transparent via-border/50 to-border/80" />
    </section>
  );
}
