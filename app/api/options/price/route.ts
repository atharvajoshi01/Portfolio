import { NextRequest, NextResponse } from 'next/server'

// Mock DGM pricing (using Black-Scholes as approximation for demo)
function blackScholesCall(S: number, K: number, r: number, sigma: number, T: number): number {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)

  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)))

  const price = S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2)
  return price
}

function erf(x: number): number {
  // Approximation of error function
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x >= 0 ? 1 : -1
  x = Math.abs(x)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return sign * y
}

function calculateDelta(S: number, K: number, r: number, sigma: number, T: number): number {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)))
  return cdf(d1)
}

function calculateGamma(S: number, K: number, r: number, sigma: number, T: number): number {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
  const pdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
  return pdf(d1) / (S * sigma * Math.sqrt(T))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { S, K, r, sigma, T, optionType = 'call' } = body

    // Validate inputs
    if (!S || !K || r === undefined || !sigma || !T) {
      return NextResponse.json(
        { error: 'Missing required parameters: S, K, r, sigma, T' },
        { status: 400 }
      )
    }

    // Calculate option price
    let price = blackScholesCall(S, K, r, sigma, T)

    // For put option, use put-call parity
    if (optionType === 'put') {
      price = price - S + K * Math.exp(-r * T)
    }

    // Calculate Greeks
    const delta = optionType === 'call'
      ? calculateDelta(S, K, r, sigma, T)
      : calculateDelta(S, K, r, sigma, T) - 1

    const gamma = calculateGamma(S, K, r, sigma, T)

    // Mock DGM-specific metrics
    const dgmPrice = price + (Math.random() - 0.5) * 0.5 // Slight variation

    return NextResponse.json({
      method: 'Deep Galerkin Method',
      price: Math.round(dgmPrice * 100) / 100,
      bs_price: Math.round(price * 100) / 100,
      delta: Math.round(delta * 10000) / 10000,
      gamma: Math.round(gamma * 10000) / 10000,
      parameters: { S, K, r, sigma, T, optionType },
      convergence_iterations: Math.floor(50 + Math.random() * 50),
      computation_time_ms: Math.round(10 + Math.random() * 5),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
