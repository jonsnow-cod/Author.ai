import { NextResponse } from "next/server";
import { callProvider } from "@/lib/providers";

export async function POST(req: Request) {
  try {
    const { prompt, provider } = await req.json();

    if (!prompt || !provider) {
      return NextResponse.json(
        { error: "Missing prompt or provider" },
        { status: 400 }
      );
    }

    const text = await callProvider(provider, prompt);
    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}