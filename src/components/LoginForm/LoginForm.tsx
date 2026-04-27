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
import AgentLogPanel from '@/components/AgentLogPanel'
import ConstellationMark from '@/components/TopNav/_components/ConstellationMark'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function GitHubGlyph() {
  const { palette } = useTheme()
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={palette.text.primary}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.3-.51-1.47.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.74 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.39-5.27 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  )
}

function VisualSide() {
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
      {/* Absolutely-positioned inner — never influences grid row height */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          background: `linear-gradient(180deg, ${palette.background.default} 0%, #0A0816 100%)`,
          display: 'flex',
          flexDirection: 'column',
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

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Pitch copy */}
          <Box sx={{ maxWidth: 440 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                fontSize: 11,
                color: 'secondary.main',
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.12em',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main',
                  flexShrink: 0,
                }}
              />
              WHAT YOUR TEAM WILL DO
            </Box>
            <Typography
              variant="h2"
              sx={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em', mb: 0 }}
            >
              Four agents,
              <br />
              one shortlist,
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                tailored resumes
              </Box>
              .
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 380, lineHeight: 1.55 }}
            >
              Fetch listings, score fit, rewrite the resume. Grimoire handles the loop — you approve
              the output.
            </Typography>
          </Box>

          {/* Log panel anchored to bottom */}
          <Box sx={{ mt: 'auto' }}>
            <AgentLogPanel compact title="preview · sample run" />
          </Box>
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
    <Box sx={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
