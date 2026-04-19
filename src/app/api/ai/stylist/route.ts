import { NextRequest, NextResponse } from "next/server";
import { fashionModel, SYSTEM_PROMPT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}\n\nAI Stylist Response:`;
    
    const result = await fashionModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("[AI Stylist API Error]:", error);
    return NextResponse.json(
      { reply: "I'm sorry, my style database is offline for maintenance. I can still suggest looking at our 'New Arrivals' for inspiration!" },
      { status: 500 }
    );
  }
}
