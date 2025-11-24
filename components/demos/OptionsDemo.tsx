'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calculator } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function OptionsDemo() {
  const [params, setParams] = useState({
    S: 100,
    K: 100,
    r: 0.05,
    sigma: 0.2,
    T: 1.0,
    optionType: 'call',
  })

  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (key: string, value: string | number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const priceOption = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/options/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error pricing option:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Deep Galerkin Options Pricing
        </h2>
        <p className="text-neutral-600">
          Price European options using a neural PDE solver. Adjust parameters to see how the model
          responds in real-time.
        </p>
      </div>

      {/* Parameter Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Spot Price (S)</label>
          <input
            type="number"
            value={params.S}
            onChange={(e) => handleInputChange('S', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            step="1"
          />
          <input
            type="range"
            min="50"
            max="150"
            value={params.S}
            onChange={(e) => handleInputChange('S', parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Strike Price (K)</label>
          <input
            type="number"
            value={params.K}
            onChange={(e) => handleInputChange('K', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            step="1"
          />
          <input
            type="range"
            min="50"
            max="150"
            value={params.K}
            onChange={(e) => handleInputChange('K', parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Risk-Free Rate (r)</label>
          <input
            type="number"
            value={params.r}
            onChange={(e) => handleInputChange('r', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            step="0.01"
          />
          <input
            type="range"
            min="0"
            max="0.15"
            step="0.01"
            value={params.r}
            onChange={(e) => handleInputChange('r', parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Volatility (σ)</label>
          <input
            type="number"
            value={params.sigma}
            onChange={(e) => handleInputChange('sigma', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            step="0.01"
          />
          <input
            type="range"
            min="0.05"
            max="0.6"
            step="0.05"
            value={params.sigma}
            onChange={(e) => handleInputChange('sigma', parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Time to Maturity (T) years</label>
          <input
            type="number"
            value={params.T}
            onChange={(e) => handleInputChange('T', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            step="0.1"
          />
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={params.T}
            onChange={(e) => handleInputChange('T', parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Option Type</label>
          <select
            value={params.optionType}
            onChange={(e) => handleInputChange('optionType', e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          >
            <option value="call">Call Option</option>
            <option value="put">Put Option</option>
          </select>
        </div>
      </div>

      {/* Price Button */}
      <div className="flex justify-center">
        <Button size="lg" onClick={priceOption} className="gap-2">
          <Calculator size={20} />
          {loading ? 'Pricing...' : 'Price Option'}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neutral-50 rounded-lg p-6 border border-neutral-200"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-accent" />
            Pricing Results
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-sm text-neutral-600 mb-1">DGM Price</p>
              <p className="text-3xl font-bold text-accent">${result.price}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-sm text-neutral-600 mb-1">Delta (∆)</p>
              <p className="text-3xl font-bold text-primary">{result.delta}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-sm text-neutral-600 mb-1">Gamma (Γ)</p>
              <p className="text-3xl font-bold text-primary">{result.gamma}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-600 mb-2">Black-Scholes Price (Benchmark):</p>
              <p className="font-semibold text-lg">${result.bs_price}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-600 mb-2">DGM Error:</p>
              <p className="font-semibold text-lg">
                ${Math.abs(result.price - result.bs_price).toFixed(3)} (
                {((Math.abs(result.price - result.bs_price) / result.bs_price) * 100).toFixed(2)}
                %)
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-600 mb-2">Convergence Iterations:</p>
              <p className="font-semibold text-lg">{result.convergence_iterations}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-600 mb-2">Computation Time:</p>
              <p className="font-semibold text-lg">{result.computation_time_ms}ms</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-300">
            <p className="text-xs text-neutral-500">
              Note: DGM (Deep Galerkin Method) is a physics-informed neural network that solves the
              Black-Scholes PDE. Results compared against analytical Black-Scholes for validation.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
