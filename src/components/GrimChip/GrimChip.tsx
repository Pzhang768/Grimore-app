'use client'

import { Box, useTheme, type SxProps, type Theme } from '@mui/material'
import type { ReactNode } from 'react'

type PaletteColor =
  | 'secondary'
  | 'primary'
  | 'error'
  | 'warning'
  | 'text.secondary'
  | 'text.disabled'

interface GrimChipProps {
  children: ReactNode
  color?: PaletteColor
  sx?: SxProps<Theme>
}

export default function GrimChip({ children, color = 'secondary', sx }: GrimChipProps) {
  const { palette } = useTheme()

  const PALETTE_MAP: Record<PaletteColor, string> = {
    secondary: palette.secondary.main,
    primary: palette.primary.main,
    error: palette.error.main,
    warning: palette.warning.main,
    'text.secondary': palette.text.secondary,
    'text.disabled': palette.text.disabled,
  }

  const resolvedColor = PALETTE_MAP[color]

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 0.375,
        borderRadius: '999px',
        background: `${resolvedColor}14`,
        border: `1px solid ${resolvedColor}40`,
        fontSize: 11,
        fontWeight: 600,
        color: resolvedColor,
        letterSpacing: '0.02em',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
