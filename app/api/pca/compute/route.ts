import { NextRequest, NextResponse } from 'next/server'

// Simple PCA computation (mock for demo)
function computePCA(data: number[][]): {
  pca: number[][]
  explained_variance: number[]
  loadings: number[][]
} {
  const n = data.length
  const m = data[0].length

  // Mock PCA computation (in reality, use proper linear algebra)
  // Generate synthetic 2D projection
  const pca: number[][] = data.map((_, i) => [
    Math.random() * 10 - 5 + i * 0.1,
    Math.random() * 8 - 4 + (i % 2) * 2,
  ])

  const explained_variance = [0.421, 0.213, 0.147, 0.089, 0.061]
  const loadings: number[][] = Array(m).fill(0).map(() => [
    Math.random() - 0.5,
    Math.random() - 0.5,
  ])

  return { pca, explained_variance, loadings }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, n_components = 2 } = body

    // Validate input
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data: expected non-empty 2D array' },
        { status: 400 }
      )
    }

    // Generate mock metabolomics data if not provided with sufficient detail
    const mockData = Array.from({ length: 250 }, (_, i) => ({
      id: `patient_${i}`,
      pc1: Math.random() * 10 - 5 + (i < 45 ? 2 : 0),  // GDM patients offset
      pc2: Math.random() * 8 - 4,
      gdm_status: i < 45 ? 1 : 0,  // 18% GDM prevalence (45/250)
      metabolites: {
        isoleucine: 2.5 + Math.random() * 1.5 + (i < 45 ? 1.2 : 0),
        leucine: 3.1 + Math.random() * 1.2 + (i < 45 ? 1.0 : 0),
        valine: 2.8 + Math.random() * 1.3 + (i < 45 ? 0.9 : 0),
      },
    }))

    const result = computePCA(data)

    return NextResponse.json({
      pca: result.pca,
      explained_variance: result.explained_variance.slice(0, n_components),
      cumulative_variance: result.explained_variance
        .slice(0, n_components)
        .reduce((acc, val) => acc + val, 0),
      loadings: result.loadings,
      n_components,
      mock_data: mockData,  // Include mock data for visualization
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return mock metabolomics data for demo
  const mockData = Array.from({ length: 250 }, (_, i) => ({
    id: `patient_${i}`,
    pc1: Math.random() * 10 - 5 + (i < 45 ? 2 : 0),
    pc2: Math.random() * 8 - 4,
    gdm_status: i < 45 ? 'GDM' : 'Control',
    age: 25 + Math.floor(Math.random() * 15),
    bmi: 22 + Math.random() * 10 + (i < 45 ? 3 : 0),
  }))

  return NextResponse.json({
    data: mockData,
    metadata: {
      n_samples: 250,
      n_gdm: 45,
      n_control: 205,
      prevalence: 0.18,
    },
  })
}
