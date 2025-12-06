import "./globals.css";
import { CustomThemeProvider } from "@/components/theme/theme-provider";
import { IRANYekan, Gilroy } from "@/fonts/local-fonts";
import { cn } from "@/lib/utils";
import { FloatingHeader } from "@/components/layout/floating-header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { BackgroundEffects } from "@/components/effects/background-effects";
import { JsonLd } from "@/components/seo/json-ld";
import { FloatingChatbot } from "@/components/ai-ui/floating-chatbot";
import { siteConfig } from "@/config/site";
import type { Viewport } from "next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description: `${siteConfig.nameEn} - Cardiologist, MD & Software Engineer. ${siteConfig.about.intro}`,
  authors: [
    { name: siteConfig.nameEn, url: siteConfig.url },
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.nameEn,
  publisher: siteConfig.nameEn,
  category: "Personal Website",
  keywords: [
    siteConfig.name,
    siteConfig.nameEn,
    "Reza Shahnazar",
    "رضا شاه‌نظر",
    "رضا شاه نظر نژاد خالصی",
    "Reza Shahnazar Nezhad Khalesi",
    "Cardiologist",
    "متخصص قلب و عروق",
    "Software Engineer",
    "مهندس نرم‌افزار",
    "Data Scientist",
    "علم داده",
    "AI Product Development",
    "هوش مصنوعی",
    "Tehran Heart Center",
    "مرکز قلب تهران",
    "Tehran University of Medical Sciences",
    "دانشگاه علوم پزشکی تهران",
    "TUMS",
    "Digikala",
    "دیجی‌کالا",
    "Biology Olympiad",
    "المپیاد زیست‌شناسی",
    "Gold Medalist",
    "مدال طلا",
    "Cardiovascular Medicine",
    "Full-Stack Development",
    "Product Management",
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.nameEn} - Cardiologist, MD & Software Engineer`,
    description: `${siteConfig.nameEn} is a cardiologist and software engineer focused on building data-driven and AI-enabled solutions for healthcare and large-scale digital platforms.`,
    type: "profile",
    url: siteConfig.url,
    siteName: siteConfig.nameEn,
    locale: "fa_IR",
    alternateLocale: "en_US",
    firstName: "Reza",
    lastName: "Shahnazar",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.nameEn} - Cardiologist & Software Engineer`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameEn} - Cardiologist, MD & Software Engineer`,
    description: `Cardiologist and software engineer focused on AI-enabled solutions for healthcare and digital platforms.`,
    images: [`${siteConfig.url}/opengraph-image`],
    creator: "@rezashahnazar",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "fa-IR": siteConfig.url,
      "en-US": siteConfig.url,
    },
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={cn(
          IRANYekan.className,
          Gilroy.variable,
          "min-h-screen flex flex-col antialiased"
        )}
      >
        <CustomThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <BackgroundEffects
            mask={siteConfig.effects.mask}
            gradient={siteConfig.effects.gradient}
            dots={siteConfig.effects.dots}
            grid={siteConfig.effects.grid}
            lines={siteConfig.effects.lines}
            noise={siteConfig.effects.noise}
          />
          <SkipLink href="#main-content">رفتن به محتوای اصلی</SkipLink>
          <FloatingHeader />
          <main id="main-content" className="flex-1 w-full pt-20">
            {children}
          </main>
          <Footer />
          <FloatingChatbot />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
