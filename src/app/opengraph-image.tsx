import { createOpenGraphImage } from "@/lib/opengraph";
import { Logo } from "@/components/brand/logo";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Reza Shahnazar | رضا شاه‌نظر";

export default async function Image() {
  return createOpenGraphImage({
    logo: <Logo size={80} />,
    title: "Reza Shahnazar",
    line1: "رضا شاه‌نظر",
    line2: "متخصص قلب و عروق | مهندس نرم‌افزار",
  });
}
