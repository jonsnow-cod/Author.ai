// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { getProvider, TaskType } from "../../../lib/providers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const task = body.task as TaskType; // "draft" or "polish"
    const prompt = body.prompt as string;

    if (!task || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields: task, prompt" },
        { status: 400 }
      );
    }

    const result = await getProvider(task, prompt);

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}