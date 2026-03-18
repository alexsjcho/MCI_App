'use client'

import { Box, Typography } from '@mui/material'
import { tokens } from '../../theme'
import { calcTCO } from '../../utils/calculations'
import { COMPETITORS } from '../../data/competitors'
import type { Competitor } from '../../types'

// Resolve WisdomAI by ID — safe against reordering in the data array
const WISDOM_COMP = COMPETITORS.find((c) => c.id === 'wisdom')!
const WISDOM_TCO = calcTCO(WISDOM_COMP.tco)

interface StatDiff {
  label: string
  variant: 'pos' | 'neg'
}

interface StatChipProps {
  label: string
  value: string
  sub: string
  diff: StatDiff
}

function StatChip({ label, value, sub, diff }: StatChipProps) {
  const diffColor = diff.variant === 'pos' ? tokens.success : tokens.danger
  const diffBg = diff.variant === 'pos' ? 'rgba(23,168,110,0.10)' : 'rgba(217,79,70,0.10)'

  return (
    <Box
      sx={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: '10px',
        px: '20px',
        py: '16px',
      }}
    >
      <Typography
        sx={{
          fontSize: '10px',
          fontFamily: '"DM Mono", monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: tokens.text3,
          mb: '8px',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '26px',
          fontWeight: 700,
          color: tokens.text,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      <Typography sx={{ fontSize: '11px', color: tokens.text3, mt: '4px' }}>{sub}</Typography>

      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '11px',
          fontWeight: 500,
          px: '8px',
          py: '2px',
          borderRadius: '20px',
          mt: '6px',
          background: diffBg,
          color: diffColor,
        }}
      >
        {diff.label}
      </Box>
    </Box>
  )
}

interface StatChipGridProps {
  competitors: Competitor[] // non-wisdom only
}

export function StatChipGrid({ competitors }: StatChipGridProps) {
  const priced = competitors.filter((c) => c.entryPrice > 0)
  const avgPrice = priced.length ? '$' + Math.round(priced.reduce((s, c) => s + c.entryPrice, 0) / priced.length) : '—'

  const avgTCO = competitors.length ? Math.round(competitors.reduce((s, c) => s + calcTCO(c.tco), 0) / competitors.length) : 0
  const tcoDiff = avgTCO - WISDOM_TCO

  const aiCount = competitors.filter((c) => c.aiNative).length
  const transCount = competitors.filter((c) => c.transparent).length
  const transPct = competitors.length ? Math.round((transCount / competitors.length) * 100) + '%' : '—'

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', mb: '24px' }}>
      <StatChip label="Avg. Entry Price" value={priced.length ? avgPrice : '—'} sub="per user / month" diff={{ label: '↓ vs WisdomAI', variant: 'pos' }} />

      <StatChip
        label="Avg. Enterprise TCO"
        value={competitors.length ? `$${avgTCO}K` : '—'}
        sub="3-yr, 50 users"
        diff={{
          label: competitors.length ? `${tcoDiff > 0 ? '↑' : '↓'} $${Math.abs(tcoDiff)}K vs WisdomAI` : '—',
          variant: tcoDiff > 0 ? 'neg' : 'pos',
        }}
      />

      <StatChip
        label="AI-Native Tools"
        value={competitors.length ? `${aiCount} / ${competitors.length}` : '—'}
        sub="true AI-first vendors"
        diff={{ label: 'WisdomAI leads', variant: 'pos' }}
      />

      <StatChip
        label="Pricing Transparency"
        value={competitors.length ? transPct : '—'}
        sub="publicly listed pricing"
        diff={{ label: 'remainder require sales', variant: 'neg' }}
      />
    </Box>
  )
}

