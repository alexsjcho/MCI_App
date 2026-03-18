'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import { chartTooltip, tokens } from '../../theme'
import { COMPETITORS } from '../../data/competitors'
import type { Competitor } from '../../types'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

// Resolve WisdomAI by ID — safe against reordering in the data array
const WISDOM = COMPETITORS.find((c) => c.id === 'wisdom')!

/** Expand a TCO record into an ordered 3-year cost array (in $K) */
function tcoToSplit(tco: Competitor['tco']): number[] {
  return [tco.license * 3, tco.impl, tco.training, tco.compute * 3, tco.support * 3].map((v) => Math.round(v / 1000))
}

interface TCODonutChartProps {
  competitors: Competitor[] // non-wisdom selected
}

export function TCODonutChart({ competitors }: TCODonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    chartRef.current?.destroy()

    const wSplit = tcoToSplit(WISDOM.tco)

    const avgSplit = competitors.length
      ? wSplit.map((_, i) =>
          Math.round(
            competitors.reduce((s, c) => s + tcoToSplit(c.tco)[i], 0) / competitors.length,
          ),
        )
      : wSplit

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Licenses', 'Implementation', 'Training', 'Storage/Compute', 'Support'],
        datasets: [
          {
            label: 'WisdomAI',
            data: wSplit,
            backgroundColor: ['#5b4de8', '#7c6dfa', '#9b8ffc', '#b8affd', '#d4d0fe'],
            borderWidth: 0,
          },
          {
            label: 'Avg Selected',
            data: avgSplit,
            backgroundColor: ['#e11d48', '#ea580c', '#d4820a', '#16a34a', '#0891b2'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: tokens.text2,
              font: { family: 'Inter', size: 11 },
              padding: 12,
              boxWidth: 10,
              borderRadius: 2,
            },
          },
          tooltip: {
            ...chartTooltip,
            callbacks: {
              label: (ctx) =>
                `${(ctx as { dataset?: { label?: string } }).dataset?.label ?? ""}: $${(ctx as { parsed?: number }).parsed ?? 0}K`,
            },
          },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
    }
  }, [competitors])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 340 }}>
      <canvas ref={canvasRef} />
    </Box>
  )
}

