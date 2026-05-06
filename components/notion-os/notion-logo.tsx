"use client"

import Image from "next/image"

interface NotionLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "icon" | "full"
  className?: string
}

const sizes = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 48, text: "text-2xl" },
  xl: { icon: 96, text: "text-4xl" },
}

export function NotionLogo({ size = "md", variant = "full", className = "" }: NotionLogoProps) {
  const { icon, text } = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="relative flex items-center justify-center bg-white rounded-lg p-1"
        style={{ width: icon, height: icon }}
      >
        <Image
          src="/notion-logo.svg"
          alt="Notion"
          width={icon - 8}
          height={icon - 8}
          className="object-contain"
        />
      </div>
      {variant === "full" && (
        <span className={`font-semibold text-foreground ${text}`}>Notion</span>
      )}
    </div>
  )
}

// Inline SVG version for boot screen and places where Image component can't be used
export function NotionLogoInline({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative flex items-center justify-center bg-white rounded-2xl ${className}`}
      style={{ width: size, height: size, padding: size * 0.125 }}
    >
      <svg 
        viewBox="0 0 120 126" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size * 0.75, height: size * 0.75 }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M20.6927 21.6927C24.5836 24.7351 26.0436 24.4533 33.3345 23.8897L95.1563 19.6897C96.6163 19.6897 95.4381 18.2297 94.8745 18.0115L84.2345 10.4388C81.9127 8.69695 78.8727 6.67331 73.0745 7.23695L13.1018 11.5733C10.4981 11.8551 9.93451 13.3151 11.1127 14.2115L20.6927 21.6927ZM24.8654 35.7842V102.32C24.8654 105.642 26.6072 106.82 30.4981 106.538L98.4781 102.602C102.369 102.32 102.933 99.9987 102.933 97.2133V31.0297C102.933 28.2442 101.755 26.7842 99.0418 27.0024L28.4745 31.0933C25.6872 31.3115 24.8654 32.9897 24.8654 35.7842ZM91.5418 38.8497C92.1054 41.3533 91.5418 43.8533 89.0418 44.1351L85.7127 44.7697V93.6042C82.8254 95.0642 80.2218 95.9097 78.0527 95.9097C74.4436 95.9097 73.5472 94.7315 70.7618 91.1224L49.5563 58.6697V90.0988L56.4727 91.6315C56.4727 91.6315 56.4727 95.9097 50.6745 95.9097L34.8218 96.756C34.2581 95.5778 34.8218 92.7924 36.8454 92.2288L41.1672 91.0506V50.2042L34.8254 49.6406C34.2618 47.1406 35.6581 43.5697 39.549 43.2879L56.7545 42.1697L78.9127 75.2097V46.0133L73.0745 45.4497C72.5109 42.3842 74.7963 40.0697 77.7672 39.7879L91.5418 38.8497ZM7.30181 4.31149L70.2018 0.00422095C78.8763 -0.559415 81.1981 0.0042207 86.9963 4.17695L107.075 18.2297C111.248 21.2697 112.708 22.1697 112.708 25.4933V102.602C112.708 108.4 110.668 111.724 102.933 112.287L31.6218 116.505C25.5418 116.787 22.7836 116.224 19.7345 112.287L5.27451 93.6042C2.22451 89.7133 0.764511 86.7369 0.764511 83.1333V13.3151C0.764511 8.97877 2.80451 4.87513 7.30181 4.31149Z" 
          fill="black"
        />
      </svg>
    </div>
  )
}
