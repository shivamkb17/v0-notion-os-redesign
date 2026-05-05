import { NextRequest, NextResponse } from "next/server"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

const SYSTEM_PROMPT = `You are an AI assistant for Notion OS, a futuristic intelligent workspace. 
You help users with productivity, planning, note-taking, project management, and knowledge organization.
Keep responses concise (2-3 sentences max) and helpful. Be friendly and professional.
When discussing features, emphasize AI agents, knowledge graphs, and seamless collaboration.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://notion-os.vercel.app",
        "X-Title": "Notion OS"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenRouter error:", errorData)
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: response.status }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "I'm here to help you with Notion OS."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
