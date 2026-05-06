import { NextRequest, NextResponse } from "next/server"

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

export async function POST(req: NextRequest) {
  try {
    const { text, duration_seconds } = await req.json()

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      )
    }

    if (!text) {
      return NextResponse.json(
        { error: "Text prompt is required" },
        { status: 400 }
      )
    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/sound-generation",
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          duration_seconds: duration_seconds || 1.0,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("ElevenLabs Sound Effect API error:", errorText)
      return NextResponse.json(
        { error: "Sound effect generation failed" },
        { status: response.status }
      )
    }

    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("Sound effect API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
