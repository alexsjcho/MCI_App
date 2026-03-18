import { Box, Typography } from '@mui/material'
import { tokens } from '../../theme'
import { ScoreBar } from '../../components/ScoreBar'
import { CompetitorBadge } from '../../components/CompetitorBadge'
import { calcValueScore } from '../../utils/calculations'
import type { Competitor } from '../../types'

interface CompetitorCardProps {
  competitor: Competitor
}

export function CompetitorCard({ competitor: c }: CompetitorCardProps) {
  const isWisdom = c.id === 'wisdom'
  const valueScore = calcValueScore(c.scores)

  return (
    <Box
      sx={{
        background: isWisdom ? `linear-gradient(140deg, ${tokens.wisdomDim}, ${tokens.surface})` : tokens.surface,
        border: `1px solid ${isWisdom ? tokens.wisdom : tokens.border}`,
        borderRadius: '16px',
        p: '20px',
        transition: 'all 0.18s',
        '&:hover': isWisdom
          ? {}
          : {
              borderColor: tokens.border2,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(91,77,232,0.07)',
            },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: '12px',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: tokens.text,
            }}
          >
            {c.name}
          </Typography>

          <Typography
            sx={{
              fontSize: '10px',
              fontFamily: '"DM Mono", monospace',
              color: tokens.text3,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              mt: '2px',
            }}
          >
            {c.category}
          </Typography>
        </Box>

        <CompetitorBadge variant={c.badge} label={c.badgeText} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '8px', mb: '4px' }}>
        <Typography
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            color: c.color,
          }}
        >
          {c.entryPrice > 0 ? `$${c.entryPrice}` : 'Custom'}
        </Typography>
        <Typography sx={{ fontSize: '12px', color: tokens.text3 }}>{c.entryUnit}</Typography>
      </Box>

      <Typography
        sx={{
          fontSize: '11px',
          color: tokens.text3,
          fontFamily: '"DM Mono", monospace',
          mb: '10px',
        }}
      >
        {c.priceNote}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', mt: '10px' }}>
        <ScoreBar label="AI/NLP" value={c.scores.ai} color={c.color} opacity={0.85} />
        <ScoreBar label="Ease of Use" value={c.scores.ease} color={c.color} opacity={0.7} />
        <ScoreBar label="Data Conn." value={c.scores.data} color={c.color} opacity={0.6} />
        <ScoreBar label="Value Score" value={valueScore} color={c.color} bold />
      </Box>
    </Box>
  )
}

