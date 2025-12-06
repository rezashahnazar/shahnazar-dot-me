"use client";

import { siteConfig } from "@/config/site";
import { StaggerChildren, StaggerItem, RevealFx } from "@/components/effects/reveal-fx";
import { cn } from "@/lib/utils";

export function StatsSection() {
  return (
    <section className="relative w-full section-padding-x py-12 sm:py-16 md:py-20">
      {/* Top divider */}
      <RevealFx>
        <div className="divider mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto" />
      </RevealFx>

      <div className="container-default">
        <StaggerChildren
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 lg:gap-12"
          staggerDelay={0.1}
        >
          {siteConfig.stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <div 
                className={cn(
                  "group relative text-center",
                  "py-4 sm:py-6 md:py-8",
                  "transition-all duration-300"
                )}
              >
                {/* Value */}
                <p className={cn(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
                  "text-foreground",
                  "mb-1.5 sm:mb-2 md:mb-3",
                  "transition-transform duration-300 group-hover:scale-105"
                )}>
                  {stat.value}
                </p>
                
                {/* Label */}
                <p className="text-[13px] sm:text-sm md:text-base font-medium text-muted-foreground mb-1 sm:mb-1.5 md:mb-2">
                  {stat.label}
                </p>
                
                {/* Description */}
                <p className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground/60 leading-relaxed max-w-[120px] sm:max-w-[140px] md:max-w-[160px] mx-auto">
                  {stat.description}
                </p>

                {/* Decorative line - hidden on last item per row */}
                {index < siteConfig.stats.length - 1 && (
                  <div className={cn(
                    "absolute left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
                    "w-px h-12 sm:h-16",
                    "bg-gradient-to-b from-transparent via-border/50 to-transparent",
                    "hidden lg:block",
                    index === 1 && "lg:hidden" // Hide middle divider on 2-column layout
                  )} />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Bottom divider */}
      <RevealFx delay={0.4}>
        <div className="divider mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto" />
      </RevealFx>
    </section>
  );
}
