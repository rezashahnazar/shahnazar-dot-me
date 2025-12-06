"use client";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.social.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
  {
    name: "Google Scholar",
    href: siteConfig.social.googleScholar,
    icon: GraduationCap,
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.social.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full section-padding-x py-12 sm:py-16 md:py-20 mt-8 sm:mt-12">
      {/* Top divider */}
      <div className="divider mb-10 sm:mb-12 md:mb-16 max-w-xs sm:max-w-sm mx-auto opacity-30" />
      
      <div className="container-default">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          {/* Social Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={cn(
                  "p-2.5 sm:p-3 rounded-lg",
                  "text-muted-foreground/40 hover:text-foreground",
                  "hover:bg-muted/50",
                  "transition-all duration-300",
                  "hover-lift",
                  "focus-ring"
                )}
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-[11px] sm:text-xs text-muted-foreground/40 font-medium" dir="ltr">
            <span>{currentYear}</span>
            <span className="mx-2 sm:mx-2.5">·</span>
            <span>{siteConfig.nameEn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
