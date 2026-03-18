'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js'
import { tokens, chartTooltip } from '../../theme'
import { calcTCO, shortName } from '../../utils/calculations'
import type { Competitor } from '../../types'

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip)

interface TCOBarChartProps {
  competitors: Competitor[] // all selected (including wisdom)
}

export function TCOBarChart({ competitors }: TCOBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  const height = Math.max(240, competitors.length * 38 + 60)

  useEffect(() => {
    if (!canvasRef.current) return
    chartRef.current?.destroy()

    const labels = competitors.map((c) => shortName(c.name))

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: competitors.map((c) => calcTCO(c.tco)),
            backgroundColor: competitors.map((c) => (c.id === 'wisdom' ? tokens.wisdom : c.color + '88')),
            borderColor: competitors.map((c) => c.color),
            borderWidth: 1.5,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            ...chartTooltip,
            callbacks: {
              label: (ctx) => ` $${(ctx as { parsed?: { x?: number } }).parsed?.x ?? 0}K (3-yr TCO)`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: tokens.gridColor },
            ticks: {
              color: tokens.text3,
              font: { family: 'DM Mono', size: 11 },
              callback: (v) => '$' + v + 'K',
            },
          },
          y: {
            grid: { display: false },
            ticks: { color: tokens.text2, font: { family: 'Inter', size: 12 } },
          },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
    }
  }, [competitors])

  return (
    <Box sx={{ position: 'relative', width: '100%', height }}>
      <canvas ref={canvasRef} />
    </Box>
  )
}

