'use client'

import { Box, type SxProps, type Theme } from '@mui/material'

interface BulletDotProps {
  sx?: SxProps<Theme>
}

export default function BulletDot({ sx }: BulletDotProps) {
  return (
    <Box
      component="span"
      sx={{
        width: 3,
        height: 3,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
        flexShrink: 0,
        ...sx,
      }}
    />
  )
}
