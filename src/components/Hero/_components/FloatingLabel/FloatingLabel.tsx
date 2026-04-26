'use client'

import { Box } from '@mui/material'

export default function FloatingLabel() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -14,
        left: 24,
        zIndex: 2,
        px: 1.25,
        py: 0.5,
        borderRadius: '6px',
        bgcolor: '#221D42',
        border: '1px solid',
        borderColor: 'divider',
        fontSize: 11,
        color: 'text.secondary',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        letterSpacing: '0.04em',
        animation: 'grimDrift 4s ease-in-out infinite',
        '@keyframes grimDrift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }}
    >
      <Box component="span" sx={{ color: 'secondary.main' }}>
        ◆
      </Box>{' '}
      LIVE · team.run
    </Box>
  )
}
