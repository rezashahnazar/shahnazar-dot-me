import localFont from "next/font/local";

export const IRANYekan = localFont({
  src: [
    {
      path: "./IranYekan/iranyekan_thin.woff",
      weight: "100",
    },
    {
      path: "./IranYekan/iranyekan_light.woff2",
      weight: "300",
    },
    {
      path: "./IranYekan/iranyekan_regular.woff2",
      weight: "400",
    },
    {
      path: "./IranYekan/iranyekan_medium.woff",
      weight: "500",
    },
    {
      path: "./IranYekan/iranyekan_bold.woff2",
      weight: "700",
    },
    {
      path: "./IranYekan/iranyekan_extrabold.woff",
      weight: "800",
    },
    {
      path: "./IranYekan/iranyekan_black.woff",
      weight: "900",
    },
    {
      path: "./IranYekan/iranyekan_extrablack.woff",
      weight: "950",
    },
  ],
  variable: "--font-iranyekan",
});

export const Gilroy = localFont({
  src: [
    {
      path: "./gilroy/woff/gilroy-light.woff",
      weight: "300",
    },
    {
      path: "./gilroy/woff/gilroy-regular.woff",
      weight: "400",
    },
    {
      path: "./gilroy/woff/gilroy-medium.woff",
      weight: "500",
    },
    {
      path: "./gilroy/woff/gilroy-semibold.woff",
      weight: "600",
    },
    {
      path: "./gilroy/woff/gilroy-bold.woff",
      weight: "700",
    },
    {
      path: "./gilroy/woff/gilroy-extrabold.woff",
      weight: "800",
    },
  ],
  variable: "--font-gilroy",
});
