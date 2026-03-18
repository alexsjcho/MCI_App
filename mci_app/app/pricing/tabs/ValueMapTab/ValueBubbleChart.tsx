'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Chart, BubbleController, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import { tokens, chartTooltip } from '../../theme'
import type { Competitor } from '../../types'

Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend)

interface ValueBubbleChartProps {
  competitors: Competitor[]
}

export function ValueBubbleChart({ competitors }: ValueBubbleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    chartRef.current?.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bubble',
      data: {
        datasets: competitors.map((c) => ({
          label: c.name,
          data: [
            {
              x: Math.min(c.entryPrice || 50, 130),
              y: c.valueScore,
              r: Math.max(8, Math.min(28, c.acv / 9)),
            },
          ],
          backgroundColor: c.color + '44',
          borderColor: c.color,
          borderWidth: c.id === 'wisdom' ? 3 : 1.5,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...chartTooltip,
            callbacks: {
              label: (ctx) => {
                const datasetLabel = (ctx as { dataset?: { label?: string } }).dataset?.label ?? ""
                const parsedX = (ctx as { parsed?: { x?: number } }).parsed?.x ?? 0
                const parsedY = (ctx as { parsed?: { y?: number } }).parsed?.y ?? 0
                const c = competitors.find((x) => x.name === datasetLabel)
                return [
                  datasetLabel ?? "",
                  `Entry: $${parsedX}/mo`,
                  `Value: ${parsedY}/100`,
                  `Avg ACV: ~$${c?.acv ?? 0}K`,
                ]
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Entry Price ($/user/mo)', color: tokens.text3, font: { family: 'Inter', size: 12 } },
            min: -5,
            max: 140,
            grid: { color: tokens.gridColor },
            ticks: {
              color: tokens.text3,
              font: { family: 'DM Mono', size: 11 },
              callback: (v) => '$' + v,
            },
          },
          y: {
            title: { display: true, text: 'Value Score (0–100)', color: tokens.text3, font: { family: 'Inter', size: 12 } },
            min: 60,
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
    <Box sx={{ position: 'relative', width: '100%', height: 460 }}>
      <canvas ref={canvasRef} />
    </Box>
  )
}

