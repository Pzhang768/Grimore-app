'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import GrimChip from '@/components/GrimChip'
import ConstellationMark from '@/components/TopNav/_components/ConstellationMark'
import { EyeIcon, EyeOffIcon, GoogleGlyph, GitHubGlyph } from './_components/Icons'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Enter a valid email' }),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

function TeamGraph() {
  const { palette } = useTheme()
  const W = 560,
    H = 480
  const cx = W / 2,
    cy = H / 2
  type NodeStatus = 'complete' | 'running' | 'waiting' | 'idle'
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
      r: 50,
      status: 'running',
    },
    {
      id: 'fetch',
      label: 'Fetcher',
      role: 'finds listings',
      x: cx - 180,
      y: cy - 110,
      r: 38,
      status: 'complete',
    },
    {
      id: 'fit',
      label: 'Analyser',
      role: 'scores fit',
      x: cx + 180,
      y: cy - 110,
      r: 38,
      status: 'complete',
    },
    {
      id: 'tail',
      label: 'Tailor',
      role: 'rewrites resume',
      x: cx,
      y: cy + 170,
      r: 38,
      status: 'running',
    },
  ]
  const NODE_COLORS: Record<'complete' | 'running' | 'waiting' | 'idle', string> = {
    complete: palette.secondary.main,
    running: palette.primary.light,
    waiting: palette.warning.main,
    idle: palette.text.secondary,
  }
  const nodeColor = (status: 'complete' | 'running' | 'waiting' | 'idle'): string =>
    NODE_COLORS[status]

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

        {/* edges */}
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

        {/* centre glow */}
        <circle cx={cx} cy={cy} r="120" fill="url(#loginCoordGlow)" />

        {/* nodes */}
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
                y={n.y - 4}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="13"
                fontWeight="600"
                fill={palette.text.primary}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 12}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="10"
                fill={palette.text.secondary}
              >
                {n.role}
              </text>
            </g>
          )
        })}

        {/* travelling packets */}
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

function VisualSide() {
  const { palette } = useTheme()
  return (
    /* Outer: stretches to grid row height, never grows beyond it */
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '1px solid',
        borderColor: 'divider',
        alignSelf: 'stretch',
      }}
    >
      {/* Inner: fills the outer, never adds to it */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          background: `linear-gradient(180deg, ${palette.background.default} 0%, #0A0816 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: '48px 56px',
        }}
      >
        {/* Ambient mint glow */}
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
            sx={{ fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.2, mb: 1 }}
          >
            Your agents are already working.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            A coordinator, a fetcher, an analyser, a tailor — running in parallel while you sleep.
            Log back in and pick up where they left off.
          </Typography>
          <TeamGraph />
        </Box>
      </Box>
    </Box>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const { palette } = useTheme()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) {
      setServerError(error.message)
      return
    }
    router.push('/dashboard')
  }

  return (
    <Box
      sx={{ width: '100%', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
    >
      {/* Ambient glow top-left */}
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(closest-side, ${palette.primary.main}22, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Form side */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 6,
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MuiLink
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              textDecoration: 'none',
              color: 'text.primary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <ConstellationMark size={22} />
            <Typography
              variant="h2"
              component="span"
              sx={{ fontSize: 18, letterSpacing: '-0.01em' }}
            >
              Grimoire
            </Typography>
          </MuiLink>
          <MuiLink
            component={Link}
            href="/"
            sx={{ fontSize: 13, color: 'text.secondary', textDecoration: 'none', fontWeight: 500 }}
          >
            ← Back to home
          </MuiLink>
        </Box>

        {/* Centred form */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em', mb: 1 }}
            >
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5 }}>
              Log in to resume your agent runs.
            </Typography>

            {/* SSO buttons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
              <Button
                variant="ghost"
                startIcon={<GoogleGlyph />}
                fullWidth
                sx={{ justifyContent: 'center', fontSize: 14 }}
              >
                Continue with Google
              </Button>
              <Button
                variant="ghost"
                startIcon={<GitHubGlyph />}
                fullWidth
                sx={{ justifyContent: 'center', fontSize: 14 }}
              >
                Continue with GitHub
              </Button>
            </Box>

            <Divider sx={{ my: 2.5, color: 'text.disabled', fontSize: 12 }}>
              or continue with email
            </Divider>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@domain.com"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          size="small"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: -0.5,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{
                        color: 'divider',
                        '&.Mui-checked': { color: 'secondary.main' },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
                <MuiLink
                  href="#"
                  sx={{
                    fontSize: 13,
                    color: 'secondary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  Forgot password?
                </MuiLink>
              </Box>

              {serverError && (
                <Typography variant="body2" color="error" role="alert">
                  {serverError}
                </Typography>
              )}

              <Button
                type="submit"
                variant="cta"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 0.5 }}
              >
                {isSubmitting ? 'Signing in…' : 'Log in'}
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 3.5 }}
            >
              New here?{' '}
              <MuiLink
                component={Link}
                href="/sign-up"
                sx={{ color: 'secondary.main', textDecoration: 'none', fontWeight: 600 }}
              >
                Create an account
              </MuiLink>
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'text.disabled',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            letterSpacing: '0.08em',
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontFamily: 'inherit', letterSpacing: 'inherit', color: 'inherit' }}
          >
            GRIMOIRE · V0.1 · BETA
          </Typography>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <MuiLink
              href="#"
              sx={{ color: 'inherit', textDecoration: 'none', fontSize: 'inherit' }}
            >
              TERMS
            </MuiLink>
            <MuiLink
              href="#"
              sx={{ color: 'inherit', textDecoration: 'none', fontSize: 'inherit' }}
            >
              PRIVACY
            </MuiLink>
          </Box>
        </Box>
      </Box>

      {/* Visual side */}
      <VisualSide />
    </Box>
  )
}
