'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function FFTWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrameId: number
    let time = 0

    const drawWaveform = () => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(250, 250, 250, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Generate multiple sine waves (simulating FFT components)
      const waves = [
        { amplitude: 40, frequency: 0.02, phase: time * 0.01, color: 'rgba(59, 201, 219, 0.6)' },
        { amplitude: 25, frequency: 0.04, phase: time * 0.015, color: 'rgba(59, 201, 219, 0.4)' },
        { amplitude: 15, frequency: 0.06, phase: time * 0.02, color: 'rgba(59, 201, 219, 0.3)' },
      ]

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 2 + wave.phase * 1.5) * (wave.amplitude / 2)

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      time += 1
      animationFrameId = requestAnimationFrame(drawWaveform)
    }

    drawWaveform()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isClient])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-neutral-100 rounded-lg flex items-center justify-center">
        <p className="text-neutral-400">Loading visualization...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="w-full h-full rounded-lg overflow-hidden bg-neutral-50 border border-neutral-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
