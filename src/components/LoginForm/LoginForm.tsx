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
import ConstellationMark from '@/components/TopNav/_components/ConstellationMark'
import { EyeIcon, EyeOffIcon, GoogleGlyph, GitHubGlyph } from './_components/Icons'
import VisualSide from './_components/VisualSide'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Enter a valid email' }),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

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

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

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
                onClick={signInWithGoogle}
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

      <VisualSide />
    </Box>
  )
}
