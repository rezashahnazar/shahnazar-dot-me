import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { nanoid } from "nanoid";
import { smoothStream } from "ai";
import { monitorStream } from "@/lib/stream-transformers";

export const runtime = "edge";
export const maxDuration = 30;


const avalAi = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  compatibility: "strict",
});

export async function POST(req: Request) {

  const { messages, pageContent = "" } = await req.json();

  const systemMessage = `
شما دستیار هوشمند وب‌سایت شخصی دکتر رضا شاه‌نظر هستید. شما باید با لحن حرفه‌ای، دوستانه و محترمانه پاسخ دهید.

اطلاعات کامل در اختیار شما:
${pageContent}

راهنمای پاسخ‌دهی:
۱. همیشه به فارسی پاسخ دهید (مگر اینکه سوال به زبان دیگری باشد)
۲. پاسخ‌های کوتاه، دقیق و مفید ارائه دهید
۳. از اطلاعات بالا برای پاسخ به سوالات درباره رضا شاه‌نظر استفاده کنید
۴. اگر سوالی خارج از این اطلاعات پرسیده شد، بگویید که این اطلاعات در اختیار شما نیست
۵. می‌توانید لینک‌های مربوطه (GitHub، LinkedIn، Google Scholar) را در صورت نیاز ارائه دهید
۶. برای سوالات فنی یا پزشکی عمومی می‌توانید کمک کنید، اما تاکید کنید که برای مشاوره تخصصی باید مستقیماً تماس گرفته شود
`.trim();

  const stream = streamText({
    model: avalAi("gpt-4o-mini"),
    messages,
    system: systemMessage,
    experimental_generateMessageId: nanoid,
    experimental_toolCallStreaming: true,
    experimental_transform: [smoothStream(), monitorStream()],
  });

  return stream.toDataStreamResponse();
}
