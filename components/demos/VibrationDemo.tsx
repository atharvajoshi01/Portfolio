'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Play, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function VibrationDemo() {
  const [signal, setSignal] = useState<number[]>([])
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateSignal = (faultType: string = 'normal') => {
    const length = 1000
    const newSignal: number[] = []

    for (let i = 0; i < length; i++) {
      let value = 0

      switch (faultType) {
        case 'unbalance':
          value = 2 * Math.sin((2 * Math.PI * 30 * i) / length) + Math.random() * 0.5
          break
        case 'bearing':
          value =
            Math.sin((2 * Math.PI * 20 * i) / length) +
            3 * Math.sin((2 * Math.PI * 150 * i) / length) +
            Math.random() * 0.8
          break
        case 'looseness':
          value = Math.random() * 4 - 2
          break
        default:
          value = Math.sin((2 * Math.PI * 25 * i) / length) + Math.random() * 0.3
      }

      newSignal.push(value)
    }

    setSignal(newSignal)
    setPrediction(null)
  }

  const classifySignal = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/vibration/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal }),
      })

      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error('Error classifying signal:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateSignal()
  }, [])

  const faultColors: { [key: string]: string } = {
    normal: 'text-green-600 bg-green-50',
    unbalance_fault: 'text-orange-600 bg-orange-50',
    misalignment: 'text-yellow-600 bg-yellow-50',
    bearing_fault: 'text-red-600 bg-red-50',
    looseness: 'text-purple-600 bg-purple-50',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">Vibration Fault Classifier</h2>
        <p className="text-neutral-600">
          Simulate vibration signals and classify machine faults using FFT + CNN. Generate different
          fault patterns to see how the model responds.
        </p>
      </div>

      {/* Signal Generator */}
      <div>
        <h3 className="font-semibold mb-3">Generate Vibration Signal:</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={() => generateSignal('normal')}>
            Normal Operation
          </Button>
          <Button variant="outline" size="sm" onClick={() => generateSignal('unbalance')}>
            Unbalance Fault
          </Button>
          <Button variant="outline" size="sm" onClick={() => generateSignal('bearing')}>
            Bearing Fault
          </Button>
          <Button variant="outline" size="sm" onClick={() => generateSignal('looseness')}>
            Looseness
          </Button>
        </div>
      </div>

      {/* Time Series Visualization */}
      <div>
        <h3 className="font-semibold mb-3">Time-Series Signal:</h3>
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
          <svg width="100%" height="200" viewBox="0 0 1000 200">
            <polyline
              fill="none"
              stroke="#3BC9DB"
              strokeWidth="2"
              points={signal
                .map((value, index) => {
                  const x = (index / signal.length) * 1000
                  const y = 100 - value * 20
                  return `${x},${y}`
                })
                .join(' ')}
            />
            <line x1="0" y1="100" x2="1000" y2="100" stroke="#D3D3D3" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Classify Button */}
      <div className="flex justify-center">
        <Button size="lg" onClick={classifySignal} className="gap-2">
          {loading ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
              Classifying...
            </>
          ) : (
            <>
              <Play size={20} />
              Classify Fault
            </>
          )}
        </Button>
      </div>

      {/* Prediction Results */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neutral-50 rounded-lg p-6 border border-neutral-200"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-accent" />
            Classification Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-neutral-600 mb-2">Predicted Fault Class:</p>
              <div
                className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                  faultColors[prediction.class] || 'text-neutral-600 bg-neutral-100'
                }`}
              >
                {prediction.class.replace(/_/g, ' ').toUpperCase()}
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-2">Confidence:</p>
              <div className="text-3xl font-bold text-accent">
                {(prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {prediction.metrics && (
            <div className="mt-6 pt-6 border-t border-neutral-300">
              <p className="text-sm text-neutral-600 mb-3">FFT Metrics:</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-neutral-500">Peak Frequency</p>
                  <p className="font-semibold">{prediction.metrics.peak_frequency_hz} Hz</p>
                </div>
                <div>
                  <p className="text-neutral-500">FFT Magnitude</p>
                  <p className="font-semibold">{prediction.metrics.fft_magnitude}</p>
                </div>
                <div>
                  <p className="text-neutral-500">RMS Value</p>
                  <p className="font-semibold">{prediction.metrics.rms_value}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
