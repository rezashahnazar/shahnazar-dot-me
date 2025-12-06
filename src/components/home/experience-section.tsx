"use client";

import { siteConfig } from "@/config/site";
import { RevealFx, StaggerChildren, StaggerItem } from "@/components/effects/reveal-fx";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section className="relative w-full section-padding-x py-16 sm:py-20 md:py-24">
      <div className="container-default">
        {/* Section Header */}
        <RevealFx>
          <div className="section-title">
            <Briefcase className="section-title-icon" />
            <h2 className="section-title-text">
              سوابق حرفه‌ای
            </h2>
          </div>
        </RevealFx>

        {/* Timeline */}
        <StaggerChildren 
          className="relative space-y-0"
          staggerDelay={0.08}
        >
          {/* Timeline line - desktop */}
          <div className="absolute right-[7px] md:right-[200px] lg:right-[216px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border/50 to-transparent hidden md:block" />

          {siteConfig.experiences.map((experience, index) => (
            <StaggerItem key={`${experience.company}-${index}`}>
              <div 
                className={cn(
                  "group relative",
                  "py-6 sm:py-8 first:pt-4 last:pb-2"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 lg:gap-8 px-1.5 sm:px-2.5">
                  {/* Period - Desktop */}
                  <div className="hidden md:flex md:w-44 lg:w-48 shrink-0 justify-end items-start pt-1">
                    <p className="text-xs sm:text-sm text-muted-foreground/60 font-medium text-left whitespace-nowrap" dir="ltr">
                      {experience.period}
                    </p>
                  </div>

                  {/* Timeline dot - Desktop */}
                  <div className="hidden md:flex items-start pt-2">
                    <div className={cn(
                      "relative w-3 h-3 rounded-full",
                      "bg-muted-foreground/20 border-2 border-background",
                      "group-hover:bg-foreground/30",
                      "transition-colors duration-300"
                    )}>
                      <div className="absolute inset-0.5 rounded-full bg-background" />
                      <div className={cn(
                        "absolute inset-1 rounded-full",
                        "bg-muted-foreground/40 group-hover:bg-foreground/60",
                        "transition-colors duration-300"
                      )} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Period - Mobile */}
                    <div className="md:hidden flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground/60 font-medium mb-3 px-0.5">
                      <span className="tracking-tight">{experience.period}</span>
                      {experience.duration && (
                        <span className="text-muted-foreground/40 text-[10px]">
                          {experience.duration}
                        </span>
                      )}
                    </div>

                    {/* Title & Company */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-[15px] sm:text-lg font-semibold text-foreground mb-1.5 group-hover:text-foreground/90 transition-colors leading-snug px-0.5">
                        {experience.title}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-muted-foreground px-0.5">
                        <span className="font-medium">{experience.company}</span>
                        <span className="text-muted-foreground/40 mx-1.5 sm:mx-2">·</span>
                        <span className="text-muted-foreground/70">{experience.location}</span>
                      </p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[13px] sm:text-sm text-muted-foreground/75 leading-relaxed mb-4 px-0.5">
                      {experience.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 px-0.5">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tag text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Divider between items */}
                {index < siteConfig.experiences.length - 1 && (
                  <div className="mt-6 sm:mt-8 md:mr-[196px] lg:mr-[212px] border-b border-border/20" />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
