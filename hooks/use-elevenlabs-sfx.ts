"use client"

import { useCallback, useRef } from "react"

// In-memory cache to avoid re-fetching the same sound effect
const sfxCache = new Map<string, string>()

export function useElevenLabsSfx() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSfx = useCallback(async (prompt: string, duration: number = 1.0, volume: number = 0.3) => {
    try {
      // Check cache first
      const cacheKey = `${prompt}-${duration}`
      let blobUrl = sfxCache.get(cacheKey)

      if (!blobUrl) {
        const response = await fetch("/api/sound-effect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: prompt, duration_seconds: duration }),
        })

        if (!response.ok) return

        const blob = await response.blob()
        blobUrl = URL.createObjectURL(blob)
        sfxCache.set(cacheKey, blobUrl)
      }

      // Stop any currently playing sound
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(blobUrl)
      audio.volume = volume
      audioRef.current = audio
      await audio.play()
    } catch {
      // Silently fail -- sound effects are non-critical
    }
  }, [])

  return { playSfx }
}
