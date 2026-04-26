'use client'

import { Box, useTheme } from '@mui/material'

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error' | 'waiting'

interface StatusDotProps {
  status?: AgentStatus
  size?: number
}

export default function StatusDot({ status = 'idle', size = 8 }: StatusDotProps) {
  const { palette } = useTheme()

  const STATUS_COLORS: Record<AgentStatus, string> = {
    idle: palette.text.secondary,
    running: palette.primary.light,
    complete: palette.secondary.main,
    error: palette.error.main,
    waiting: palette.warning.main,
  }

  const color = STATUS_COLORS[status]
  const pulses = status === 'running' || status === 'waiting'

  return (
    <Box
      component="span"
      sx={{ position: 'relative', display: 'inline-flex', width: size, height: size }}
    >
      {pulses && (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: color,
            opacity: 0.5,
            animation: 'grimPulse 1.6s ease-out infinite',
            '@keyframes grimPulse': {
              '0%': { transform: 'scale(1)', opacity: 0.55 },
              '100%': { transform: 'scale(2.6)', opacity: 0 },
            },
          }}
        />
      )}
      <Box
        component="span"
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          boxShadow: status === 'complete' ? `0 0 10px ${color}99` : 'none',
        }}
      />
    </Box>
  )
}
