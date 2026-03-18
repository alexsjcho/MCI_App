'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { tokens, chartTooltip } from '../../theme'
import { shortName } from '../../utils/calculations'
import type { Competitor } from '../../types'

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface TierValueChartProps {
  competitors: Competitor[]
}

export function TierValueChart({ competitors }: TierValueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

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
            label: 'Value Score',
            data: competitors.map((c) => c.valueScore),
            backgroundColor: competitors.map((c) => c.color + '44'),
            borderColor: competitors.map((c) => c.color),
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Deploy Ease',
            data: competitors.map((c) => Math.max(10, 100 - Math.round(c.tco.impl / 600))),
            backgroundColor: 'rgba(23,168,110,0.15)',
            borderColor: 'rgba(23,168,110,0.7)',
            borderWidth: 1.5,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: tokens.text2,
              font: { family: 'Inter', size: 12 },
              boxWidth: 10,
              borderRadius: 2,
              padding: 16,
            },
          },
          tooltip: { ...chartTooltip },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tokens.text2, font: { family: 'Inter', size: 11 }, maxRotation: 30 },
          },
          y: {
            max: 100,
            grid: { color: tokens.gridColor },
            ticks: { color: tokens.text3, font: { family: 'DM Mono', size: 11 } },
          },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
    }
  }, [competitors])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 260 }}>
      <canvas ref={canvasRef} />
    </Box>
  )
}

