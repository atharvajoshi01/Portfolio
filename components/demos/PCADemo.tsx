'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function PCADemo() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/pca/compute')
      const result = await response.json()
      setData(result.data || [])
    } catch (error) {
      console.error('Error fetching PCA data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  // Calculate plot bounds
  const pc1Values = data.map((d) => d.pc1)
  const pc2Values = data.map((d) => d.pc2)
  const minPC1 = Math.min(...pc1Values)
  const maxPC1 = Math.max(...pc1Values)
  const minPC2 = Math.min(...pc2Values)
  const maxPC2 = Math.max(...pc2Values)

  const scaleX = (value: number) => {
    return ((value - minPC1) / (maxPC1 - minPC1)) * 700 + 50
  }

  const scaleY = (value: number) => {
    return 500 - ((value - minPC2) / (maxPC2 - minPC2)) * 400 - 50
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          PCA Visualizer (GDM Metabolomics)
        </h2>
        <p className="text-neutral-600">
          Explore 2D PCA projection of 156-dimensional metabolomics data. Gestational Diabetes (GDM)
          patients show distinct clustering patterns in principal component space.
        </p>
      </div>

      {/* PCA Scatter Plot */}
      <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity size={20} className="text-accent" />
            2D PCA Projection (n=250 patients)
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>GDM (n=45)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Control (n=205)</span>
            </div>
          </div>
        </div>

        <svg width="100%" height="500" viewBox="0 0 800 500" className="bg-white rounded-lg">
          {/* Axes */}
          <line x1="50" y1="450" x2="750" y2="450" stroke="#D3D3D3" strokeWidth="2" />
          <line x1="50" y1="50" x2="50" y2="450" stroke="#D3D3D3" strokeWidth="2" />

          {/* Axis Labels */}
          <text x="400" y="490" textAnchor="middle" className="text-sm fill-neutral-600">
            PC1 (42.1% variance)
          </text>
          <text
            x="20"
            y="250"
            textAnchor="middle"
            transform="rotate(-90, 20, 250)"
            className="text-sm fill-neutral-600"
          >
            PC2 (21.3% variance)
          </text>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const x = 50 + fraction * 700
            const y = 50 + fraction * 400
            return (
              <g key={fraction}>
                <line x1={x} y1="450" x2={x} y2="455" stroke="#D3D3D3" strokeWidth="1" />
                <line x1="45" y1={y} x2="50" y2={y} stroke="#D3D3D3" strokeWidth="1" />
              </g>
            )
          })}

          {/* Data Points */}
          {data.map((point, index) => {
            const x = scaleX(point.pc1)
            const y = scaleY(point.pc2)
            const isGDM = point.gdm_status === 'GDM'
            const color = isGDM ? '#EF4444' : '#3B82F6'

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                opacity="0.6"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer hover:opacity-100 transition-opacity"
              />
            )
          })}

          {/* Hover Tooltip */}
          {hoveredPoint && (
            <g>
              <rect
                x={scaleX(hoveredPoint.pc1) + 10}
                y={scaleY(hoveredPoint.pc2) - 40}
                width="120"
                height="50"
                fill="white"
                stroke="#D3D3D3"
                strokeWidth="1"
                rx="4"
              />
              <text
                x={scaleX(hoveredPoint.pc1) + 15}
                y={scaleY(hoveredPoint.pc2) - 25}
                className="text-xs fill-neutral-800 font-semibold"
              >
                {hoveredPoint.id}
              </text>
              <text
                x={scaleX(hoveredPoint.pc1) + 15}
                y={scaleY(hoveredPoint.pc2) - 12}
                className="text-xs fill-neutral-600"
              >
                Status: {hoveredPoint.gdm_status}
              </text>
              <text
                x={scaleX(hoveredPoint.pc1) + 15}
                y={scaleY(hoveredPoint.pc2) + 1}
                className="text-xs fill-neutral-600"
              >
                Age: {hoveredPoint.age}, BMI: {hoveredPoint.bmi.toFixed(1)}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Variance Explained */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 border border-neutral-200">
          <p className="text-sm text-neutral-600 mb-1">PC1 Variance</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-accent">42.1%</p>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-accent h-2 rounded-full" style={{ width: '42.1%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-neutral-200">
          <p className="text-sm text-neutral-600 mb-1">PC2 Variance</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-accent">21.3%</p>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-accent h-2 rounded-full" style={{ width: '21.3%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-neutral-200">
          <p className="text-sm text-neutral-600 mb-1">Cumulative Variance</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-primary">63.4%</p>
          </div>
          <p className="text-xs text-neutral-500 mt-2">PC1 + PC2 combined</p>
        </div>
      </div>

      {/* Interpretation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Key Insights:</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">▸</span>
            <span>
              <strong>PC1 (42% variance):</strong> Primarily driven by branched-chain amino acids
              (BCAAs) - isoleucine, leucine, valine
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">▸</span>
            <span>
              <strong>PC2 (21% variance):</strong> Dominated by fatty acid oxidation metabolites
              and acylcarnitines
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">▸</span>
            <span>
              <strong>Clustering:</strong> GDM patients (red) show higher PC1 scores, indicating
              elevated BCAA levels associated with insulin resistance
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
