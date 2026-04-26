'use client'

import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import AgentLogPanel from '@/components/AgentLogPanel'
import StatusDot from '@/components/StatusDot'
import BulletDot from '@/components/BulletDot'
import Eyebrow from './_components/Eyebrow'
import FloatingLabel from './_components/FloatingLabel'
import ArrowIcon from './_components/ArrowIcon'

export default function HeroLogForward() {
  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ambient glows */}
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          background: 'radial-gradient(closest-side, rgba(0,212,170,0.13), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 15% 90%, rgba(75,85,99,0.1), transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero grid — row height is driven by the left column only */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 8,
          px: 9,
          pt: 9,
          pb: 6,
          position: 'relative',
        }}
      >
        {/* Left — copy */}
        <Box>
          <Eyebrow />
          <Typography
            variant="h1"
            sx={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              mt: 2.5,
            }}
          >
            Your job search,
            <br />
            run by a{' '}
            <Box
              component="span"
              sx={{
                position: 'relative',
                display: 'inline-block',
                color: 'secondary.main',
              }}
            >
              team of agents
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -0.5,
                  height: 2,
                  background: 'linear-gradient(90deg, #00D4AA, transparent)',
                }}
              />
            </Box>
            .
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              lineHeight: 1.55,
              color: 'text.secondary',
              maxWidth: 520,
              mt: 3,
            }}
          >
            Grimoire assembles AI agents to find roles, score fit against your resume, and tailor an
            application per listing — while you watch the whole run unfold.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 4.5 }}>
            <Button component={Link} href="/sign-up" variant="cta" endIcon={<ArrowIcon />}>
              Get started free
            </Button>
            <Button variant="ghost">See how it works</Button>
          </Box>

          {/* Trust row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 3.5,
              fontSize: 13,
              color: 'text.secondary',
            }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
              <StatusDot status="complete" size={6} /> No setup
            </Box>
            <BulletDot />
            <span>No credit card</span>
            <BulletDot />
            <span>Free during beta</span>
          </Box>
        </Box>

        {/* Right — wrapper stretches to match left column height; panel is absolutely placed
            so it never influences the grid row height */}
        <Box sx={{ position: 'relative', alignSelf: 'stretch' }}>
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <FloatingLabel />
              <AgentLogPanel />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footnote — flex: 1 spacer pushes it to the bottom of the viewport-height flex column */}
      <Box sx={{ flex: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 9,
          py: 3,
          fontSize: 11,
          color: 'text.disabled',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          letterSpacing: '0.08em',
        }}
      >
        <span>GRIMOIRE · V0.1 · BETA</span>
        <span>JOB SEARCH · RESUME TAILORING · SHORTLISTING</span>
      </Box>
    </Box>
  )
}
