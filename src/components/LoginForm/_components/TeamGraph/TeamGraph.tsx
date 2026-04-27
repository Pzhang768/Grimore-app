'use client'

import { Box, Typography, useTheme } from '@mui/material'
import GrimChip from '@/components/GrimChip'

type NodeStatus = 'complete' | 'running' | 'waiting' | 'idle'

const W = 560
const H = 480
const cx = W / 2
const cy = H / 2

const nodes: {
  id: string
  label: string
  role: string
  x: number
  y: number
  r: number
  status: NodeStatus
}[] = [
  {
    id: 'coord',
    label: 'Coordinator',
    role: 'orchestrates',
    x: cx,
    y: cy,
    r: 60,
    status: 'running',
  },
  {
    id: 'fetch',
    label: 'Fetcher',
    role: 'finds listings',
    x: cx - 180,
    y: cy - 110,
    r: 46,
    status: 'complete',
  },
  {
    id: 'fit',
    label: 'Analyser',
    role: 'scores fit',
    x: cx + 180,
    y: cy - 110,
    r: 46,
    status: 'complete',
  },
  {
    id: 'tail',
    label: 'Tailor',
    role: 'rewrites resume',
    x: cx,
    y: cy + 170,
    r: 46,
    status: 'running',
  },
]

export default function TeamGraph() {
  const { palette } = useTheme()

  const colorMap: Record<NodeStatus, string> = {
    complete: palette.secondary.main,
    running: palette.primary.light,
    waiting: palette.warning.main,
    idle: palette.text.secondary,
  }
  const nodeColor = (status: NodeStatus): string => colorMap[status]

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 2,
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.55)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.25,
          pb: 1.75,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontFamily: 'ui-monospace, monospace' }}
        >
          team · job-search
        </Typography>
        <GrimChip color="secondary">
          <Box
            component="span"
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              flexShrink: 0,
            }}
          />
          Running
        </GrimChip>
      </Box>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="loginCoordGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.secondary.main} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.secondary.main} stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.slice(1).map((n) => (
          <line
            key={n.id}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={palette.divider}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ animation: 'grimOrbit 3s linear infinite' }}
          />
        ))}

        <circle cx={cx} cy={cy} r="120" fill="url(#loginCoordGlow)" />

        {nodes.map((n) => {
          const c = nodeColor(n.status)
          return (
            <g
              key={n.id}
              style={{
                animation:
                  n.status === 'running' ? 'grimNodePulse 2.2s ease-in-out infinite' : 'none',
              }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={palette.background.default}
                stroke={c}
                strokeWidth="1.5"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 6}
                fill="none"
                stroke={c}
                strokeWidth="1"
                opacity="0.25"
              />
              <text
                x={n.x}
                y={n.y - 5}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="15"
                fontWeight="600"
                fill={palette.text.primary}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 14}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="12"
                fill={palette.text.secondary}
              >
                {n.role}
              </text>
            </g>
          )
        })}

        {nodes.slice(1).map((n, i) => (
          <circle key={'p' + n.id} r="3" fill={nodeColor(n.status)}>
            <animateMotion
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M${cx},${cy} L${n.x},${n.y}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </Box>
  )
}
