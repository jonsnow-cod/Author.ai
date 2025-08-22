// src/lib/providers.ts

export type TaskType = "draft" | "polish";

export async function getProvider(task: TaskType, prompt: string): Promise<string> {
  if (task === "draft") {
    // Example: Call Groq API
    const response = await fetch("https://api.groq.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2-70b-4096", // Groq’s LLaMA 2 model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No response from Groq";
  }

  if (task === "polish") {
    // Example: Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // OpenAI’s lightweight GPT-4
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No response from OpenAI";
  }

  return "Unknown task type";
      }
