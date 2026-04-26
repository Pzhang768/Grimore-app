'use client'

import { Box } from '@mui/material'
import GrimChip from '@/components/GrimChip'

export default function Eyebrow() {
  return (
    <GrimChip>
      <Box
        component="span"
        sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'secondary.main' }}
      />
      Built for recent grads
    </GrimChip>
  )
}
