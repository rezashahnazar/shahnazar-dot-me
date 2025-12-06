"use client";

import { siteConfig } from "@/config/site";
import { RevealFx, StaggerChildren, StaggerItem } from "@/components/effects/reveal-fx";
import { GraduationCap, BookOpen, BookMarked, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function SectionDivider() {
  return (
    <div className="py-10 sm:py-12 md:py-16">
      <div className="divider max-w-xs mx-auto opacity-50" />
    </div>
  );
}

export function EducationSection() {
  return (
    <section className="relative w-full section-padding-x py-16 sm:py-20 md:py-24">
      <div className="container-default">
        {/* Education */}
        <div className="mb-0">
          <RevealFx>
            <div className="section-title">
              <GraduationCap className="section-title-icon" />
              <h2 className="section-title-text">تحصیلات</h2>
            </div>
          </RevealFx>

          <StaggerChildren className="space-y-6 sm:space-y-8" staggerDelay={0.1}>
            {siteConfig.education.map((edu, index) => (
              <StaggerItem key={index}>
                <div className={cn(
                  "group relative",
                  "py-4 sm:py-6",
                  "first:pt-0"
                )}>
                  <div className="flex flex-col md:flex-row md:items-start gap-2.5 md:gap-8">
                    <div className="md:w-32 lg:w-36 shrink-0">
                      <p className="text-[11px] sm:text-sm text-muted-foreground/60 font-medium">
                        {edu.period}
                      </p>
                    </div>
                    
                    <div className="flex-1 space-y-2 sm:space-y-3 pr-1">
                      <h3 className="text-[15px] sm:text-lg font-semibold text-foreground leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-muted-foreground/80">
                        {edu.university}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {edu.skills.map((skill) => (
                          <span key={skill} className="tag text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {index < siteConfig.education.length - 1 && (
                    <div className="mt-6 sm:mt-8 md:mr-[144px] lg:mr-[160px] border-b border-border/20" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        <SectionDivider />

        {/* Books */}
        <div className="mb-0">
          <RevealFx>
            <div className="section-title">
              <BookMarked className="section-title-icon" />
              <h2 className="section-title-text">تالیفات</h2>
            </div>
          </RevealFx>

          <StaggerChildren className="grid gap-6 sm:gap-8 md:grid-cols-2" staggerDelay={0.1}>
            {siteConfig.books.map((book, index) => (
              <StaggerItem key={index}>
                <Link
                  href={book.url ?? "#"}
                  target={book.url ? "_blank" : undefined}
                  rel={book.url ? "noopener noreferrer" : undefined}
                  className="block focus-ring rounded-xl"
                >
                  <div className={cn(
                    "group p-4 sm:p-6 rounded-xl",
                    "bg-muted/30 border border-border/20",
                    "hover:bg-muted/50 hover:border-border/40",
                    "transition-all duration-300"
                  )}>
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground transition-colors inline-flex items-center gap-2">
                        <span className="relative">
                          {book.title}
                          {book.url && (
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                          )}
                        </span>
                        {book.url && (
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground/70">
                        <span>{book.publisher}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span>{book.period}</span>
                      </div>
                      {book.note && (
                        <p className="text-xs text-muted-foreground/50 pt-1">
                          {book.note}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        <SectionDivider />

        {/* Publications */}
        <div className="mb-0">
          <RevealFx>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="section-title mb-0">
                <BookOpen className="section-title-icon" />
                <h2 className="section-title-text">انتشارات علمی</h2>
              </div>
              <Link
                href={siteConfig.social.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg",
                  "bg-muted/40 border border-border/30",
                  "text-xs sm:text-sm font-medium text-muted-foreground",
                  "hover:bg-muted/60 hover:text-foreground hover:border-border/50",
                  "transition-all duration-200"
                )}
              >
                <span className="relative">
                  Google Scholar
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50 transition-all duration-300 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </RevealFx>

          <StaggerChildren className="space-y-3 sm:space-y-5 mt-10 sm:mt-12" staggerDelay={0.1}>
            {siteConfig.publications.map((pub, index) => (
              <StaggerItem key={index}>
                <Link
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className={cn(
                    "group p-4 sm:p-5 rounded-xl",
                    "border border-border/20",
                    "hover:border-border/40 hover:bg-muted/20",
                    "transition-all duration-300",
                    "cursor-pointer"
                  )}>
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <p className="text-[13px] sm:text-base text-foreground/90 leading-relaxed font-medium group-hover:text-foreground transition-colors flex-1 relative" dir="ltr">
                          <span className="relative">
                            {pub.title}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground/30 transition-all duration-300 group-hover:w-full" />
                          </span>
                        </p>
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 shrink-0 mt-0.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-muted/60 text-muted-foreground rounded-md font-medium">
                          {pub.type}
                        </span>
                        <span className="text-muted-foreground/60">{pub.publisher}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-muted-foreground/60">{pub.year}</span>
                        {pub.citations && (
                          <>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="text-muted-foreground/60">{pub.citations} citations</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        <SectionDivider />

        {/* Teaching Experience */}
        <div className="mb-0">
          <RevealFx>
            <div className="section-title">
              <Users className="section-title-icon" />
              <h2 className="section-title-text">سوابق تدریس</h2>
            </div>
          </RevealFx>

          <StaggerChildren className="grid gap-2 sm:gap-3" staggerDelay={0.06}>
            {siteConfig.teaching.map((teach, index) => (
              <StaggerItem key={index}>
                <div className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6",
                  "py-3 sm:py-4 px-3 sm:px-5 rounded-lg",
                  "hover:bg-muted/30",
                  "transition-colors duration-200"
                )}>
                  <div className="sm:w-20 shrink-0">
                    <span className="text-[11px] sm:text-xs font-medium text-muted-foreground/50">
                      {teach.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="text-[13px] sm:text-sm font-medium text-foreground/90">
                      {teach.role}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/60 mt-0.5">
                      {teach.institution}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
