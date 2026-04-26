'use client'

import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import ConstellationMark from './_components/ConstellationMark'

export default function TopNav() {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 6,
        py: 2.5,
        borderBottom: '1px solid',
        borderColor: 'rgba(45,40,82,0.55)',
      }}
    >
      <Typography
        variant="h2"
        component={Link}
        href="/"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          fontSize: 20,
          letterSpacing: '-0.01em',
          color: 'text.primary',
          textDecoration: 'none',
          '&:hover': { color: 'text.primary' },
        }}
      >
        <ConstellationMark size={28} />
        Grimoire
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button component={Link} href="/login" variant="text">
          Log in
        </Button>
        <Button component={Link} href="/sign-up" variant="navGhost">
          Sign up
        </Button>
      </Box>
    </Box>
  )
}
