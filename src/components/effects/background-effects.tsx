"use client";

import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  className?: string;
  mask?: {
    x?: number;
    y?: number;
    radius?: number;
  };
  gradient?: {
    display?: boolean;
    opacity?: number;
    x?: number;
    y?: number;
    colorStart?: string;
    colorEnd?: string;
  };
  dots?: {
    display?: boolean;
    opacity?: number;
    size?: number;
    color?: string;
  };
  grid?: {
    display?: boolean;
    opacity?: number;
    color?: string;
    width?: string;
    height?: string;
  };
  lines?: {
    display?: boolean;
    opacity?: number;
    color?: string;
    angle?: number;
  };
  noise?: {
    display?: boolean;
    opacity?: number;
  };
}

export function BackgroundEffects({
  className,
  mask = { x: 50, y: 0, radius: 100 },
  gradient = { display: true, opacity: 60, x: 50, y: 50, colorStart: "hsl(var(--primary))", colorEnd: "transparent" },
  dots = { display: true, opacity: 30, size: 1, color: "hsl(var(--primary))" },
  grid = { display: false, opacity: 20, color: "hsl(var(--muted-foreground))", width: "40px", height: "40px" },
  lines = { display: false, opacity: 15, color: "hsl(var(--muted-foreground))", angle: -45 },
  noise = { display: true, opacity: 3 },
}: BackgroundEffectsProps) {
  const maskStyle = {
    maskImage: `radial-gradient(ellipse ${mask.radius ?? 100}% ${mask.radius ?? 100}% at ${mask.x ?? 50}% ${mask.y ?? 0}%, black, transparent)`,
    WebkitMaskImage: `radial-gradient(ellipse ${mask.radius ?? 100}% ${mask.radius ?? 100}% at ${mask.x ?? 50}% ${mask.y ?? 0}%, black, transparent)`,
  };

  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {gradient.display && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            ...maskStyle,
            background: `radial-gradient(ellipse 80% 60% at ${gradient.x ?? 50}% ${gradient.y ?? 50}%, ${gradient.colorStart ?? "hsl(var(--primary))"}, ${gradient.colorEnd ?? "transparent"})`,
            opacity: (gradient.opacity ?? 60) / 100,
          }}
        />
      )}

      {dots.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `radial-gradient(${dots.color ?? "hsl(var(--primary))"} ${dots.size ?? 1}px, transparent ${dots.size ?? 1}px)`,
            backgroundSize: `${(dots.size ?? 1) * 16}px ${(dots.size ?? 1) * 16}px`,
            opacity: (dots.opacity ?? 30) / 100,
          }}
        />
      )}

      {grid.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `
              linear-gradient(${grid.color ?? "hsl(var(--muted-foreground))"} 1px, transparent 1px),
              linear-gradient(90deg, ${grid.color ?? "hsl(var(--muted-foreground))"} 1px, transparent 1px)
            `,
            backgroundSize: `${grid.width ?? "40px"} ${grid.height ?? "40px"}`,
            opacity: (grid.opacity ?? 20) / 100,
          }}
        />
      )}

      {lines.display && (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            backgroundImage: `repeating-linear-gradient(
              ${lines.angle ?? -45}deg,
              transparent,
              transparent 10px,
              ${lines.color ?? "hsl(var(--muted-foreground))"} 10px,
              ${lines.color ?? "hsl(var(--muted-foreground))"} 11px
            )`,
            opacity: (lines.opacity ?? 15) / 100,
          }}
        />
      )}

      {noise.display && (
        <div
          className="absolute inset-0 bg-noise animate-subtle-drift"
          style={{
            opacity: (noise.opacity ?? 3) / 100,
          }}
        />
      )}

      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
    </div>
  );
}

