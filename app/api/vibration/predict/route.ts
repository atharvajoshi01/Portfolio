import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { signal } = body

    // Validate input
    if (!signal || !Array.isArray(signal)) {
      return NextResponse.json(
        { error: 'Invalid signal data' },
        { status: 400 }
      )
    }

    // Mock FFT processing and fault classification
    const fftMagnitude = Math.random() * 10
    const peakFrequency = 20 + Math.random() * 80
    const rmsValue = Math.random() * 5

    // Simulate classification logic
    const faultClasses = [
      'normal',
      'unbalance_fault',
      'misalignment',
      'bearing_fault',
      'looseness',
    ]

    // Simple heuristic for demo
    let predictedClass = 'normal'
    let confidence = 0.95

    if (peakFrequency > 60 && fftMagnitude > 7) {
      predictedClass = 'bearing_fault'
      confidence = 0.92
    } else if (peakFrequency < 40 && rmsValue > 3) {
      predictedClass = 'unbalance_fault'
      confidence = 0.88
    } else if (fftMagnitude > 8) {
      predictedClass = 'looseness'
      confidence = 0.85
    } else if (peakFrequency > 40 && peakFrequency < 60) {
      predictedClass = 'misalignment'
      confidence = 0.81
    }

    return NextResponse.json({
      class: predictedClass,
      confidence: confidence,
      metrics: {
        peak_frequency_hz: Math.round(peakFrequency * 10) / 10,
        fft_magnitude: Math.round(fftMagnitude * 100) / 100,
        rms_value: Math.round(rmsValue * 100) / 100,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
