"use client"

import { useState, useCallback, useRef } from "react"

interface UseElevenLabsVoiceReturn {
  speak: (text: string) => Promise<void>
  stop: () => void
  isLoading: boolean
  isPlaying: boolean
  error: string | null
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export function useElevenLabsVoice(): UseElevenLabsVoiceReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef = useRef<string | null>(null)

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current)
      audioUrlRef.current = null
    }
  }, [])

  const speak = useCallback(async (text: string) => {
    try {
      setIsLoading(true)
      setError(null)
      stop()

      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate speech")
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      audioUrlRef.current = audioUrl

      const audio = new Audio(audioUrl)
      audio.volume = 0.7 // Moderate volume
      audioRef.current = audio

      audio.onplay = () => setIsPlaying(true)
      audio.onended = () => {
        setIsPlaying(false)
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current)
          audioUrlRef.current = null
        }
      }
      audio.onerror = () => {
        setError("Failed to play audio")
        setIsPlaying(false)
      }

      // Try to autoplay, handle browser restrictions
      try {
        await audio.play()
      } catch (playError) {
        // Autoplay was prevented, user interaction required
        console.warn("Autoplay prevented:", playError)
        setError("Click to enable audio")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }, [stop])

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
    audioRef,
  }
}
