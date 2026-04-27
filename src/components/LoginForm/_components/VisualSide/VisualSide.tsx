'use client'

import { Box, Typography, useTheme } from '@mui/material'
import TeamGraph from '../TeamGraph'

export default function VisualSide() {
  const { palette } = useTheme()
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '1px solid',
        borderColor: 'divider',
        alignSelf: 'stretch',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          /* deepens slightly toward bottom; intentionally darker than background.default */
          background: `linear-gradient(180deg, ${palette.background.default} 0%, #0A0816 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: '48px 56px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: -150,
            top: '35%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(closest-side, ${palette.secondary.main}1f, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 520 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em', mb: 1 }}
          >
            Your agents are already working.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5 }}>
            A coordinator, a fetcher, an analyser, a tailor — running in parallel while you sleep.
            Log back in and pick up where they left off.
          </Typography>
          <TeamGraph />
        </Box>
      </Box>
    </Box>
  )
}
