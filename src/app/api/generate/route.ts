// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";

export async function POST(req: Request) {
  try {
    const { task, prompt } = await req.json();
    if (!task || !prompt) {
      return NextResponse.json(
        { error: "Task and prompt are required" },
        { status: 400 }
      );
    }

    const provider = getProvider(task);
    const result = await provider(prompt);

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
