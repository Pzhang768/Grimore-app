'use client'

import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import StatusDot, { type AgentStatus } from '@/components/StatusDot'
import GrimChip from '@/components/GrimChip'

export interface LogStep {
  agent: string
  status: AgentStatus
  t: string
  msg: string
}

export const DEFAULT_LOG_STEPS: LogStep[] = [
  { agent: 'Coordinator', status: 'complete', t: '00:00', msg: 'Team assembled · 4 agents online' },
  {
    agent: 'Job Listing Fetcher',
    status: 'complete',
    t: '00:03',
    msg: 'Scanning sources for "Product Manager · Remote"',
  },
  {
    agent: 'Job Listing Fetcher',
    status: 'complete',
    t: '00:14',
    msg: 'Retrieved 124 listings · deduped to 47',
  },
  {
    agent: 'Fit Analyser',
    status: 'complete',
    t: '00:22',
    msg: 'Scoring 47 listings against resume…',
  },
  {
    agent: 'Fit Analyser',
    status: 'complete',
    t: '00:41',
    msg: 'Shortlist ready · 12 strong matches',
  },
  {
    agent: 'Resume Tailoring',
    status: 'running',
    t: '00:45',
    msg: 'Rewriting resume for "Senior PM · Linear"',
  },
  { agent: 'Resume Tailoring', status: 'waiting', t: '–', msg: 'Queued: 11 more roles' },
]

interface AgentLogPanelProps {
  steps?: LogStep[]
  speed?: number
  compact?: boolean
  title?: string
}

function useStreamedLog(steps: LogStep[], speed: number) {
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (count >= steps.length) {
      const id = setTimeout(() => setCount(1), 4200 / speed)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setCount((c) => c + 1), 900 / speed)
    return () => clearTimeout(id)
  }, [count, steps.length, speed])

  return steps.slice(0, count)
}

export default function AgentLogPanel({
  steps = DEFAULT_LOG_STEPS,
  speed = 1,
  compact = false,
  title = 'Live run · job-search-team',
}: AgentLogPanelProps) {
  const shown = useStreamedLog(steps, speed)

  return (
    <Box
      sx={{
        bgcolor: '#1A1635',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02) inset',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 2.25,
          py: 1.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {['#3a3458', '#3a3458', '#3a3458'].map((c, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: c,
                display: 'inline-block',
              }}
            />
          ))}
        </Box>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', ml: 0.75, fontSize: 12, fontFamily: 'inherit' }}
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <GrimChip color="text.secondary" sx={{ borderRadius: '6px' }}>
          PREVIEW
        </GrimChip>
      </Box>

      {/* Log rows */}
      <Box sx={{ py: compact ? 1 : 1.5 }}>
        {shown.map((step, i) => (
          <LogRow key={i} step={step} last={i === shown.length - 1} compact={compact} />
        ))}
      </Box>
    </Box>
  )
}

function LogRow({ step, last, compact }: { step: LogStep; last: boolean; compact: boolean }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '56px 20px 1fr auto',
        alignItems: 'center',
        gap: 1.5,
        px: compact ? 2.25 : 2.5,
        py: compact ? 0.75 : 1.25,
        animation: 'grimFade .35s ease-out',
        '@keyframes grimFade': {
          from: { opacity: 0, transform: 'translateY(4px)' },
          to: { opacity: 1, transform: 'none' },
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 11,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          color: 'text.disabled',
        }}
      >
        {step.t}
      </Typography>
      <Box sx={{ display: 'inline-flex', justifyContent: 'center' }}>
        <StatusDot status={step.status} size={8} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: 'text.primary',
            letterSpacing: '-0.005em',
            fontFamily: 'inherit',
          }}
        >
          {step.agent}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: 'text.secondary',
            mt: 0.125,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'inherit',
          }}
        >
          {step.msg}
          {last && step.status === 'running' && <Caret />}
        </Typography>
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: 10,
          color: 'text.disabled',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontFamily: 'inherit',
        }}
      >
        {step.status}
      </Typography>
    </Box>
  )
}

function Caret() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: 7,
        height: 11,
        bgcolor: 'secondary.main',
        ml: 0.5,
        verticalAlign: 'text-bottom',
        animation: 'grimBlink 1s steps(2, end) infinite',
        '@keyframes grimBlink': { '50%': { opacity: 0 } },
      }}
    />
  )
}
