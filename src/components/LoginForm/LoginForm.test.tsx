import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import type React from 'react'
import LoginForm from './LoginForm'

const mockPush = vi.hoisted(() => vi.fn())
const mockSignIn = vi.hoisted(() => vi.fn())

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignIn,
    },
  },
}))

vi.mock('@/components/GrimChip', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

function renderForm() {
  return render(<LoginForm />)
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders logo, back link, and footer', () => {
    renderForm()
    expect(screen.getByText('Grimoire')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
    expect(screen.getByText(/GRIMOIRE · V0.1 · BETA/)).toBeInTheDocument()
  })

  it('renders SSO buttons', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue with github/i })).toBeInTheDocument()
  })

  it('renders email and password fields', () => {
    renderForm()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders remember me checkbox checked by default', () => {
    renderForm()
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeChecked()
  })

  it('toggles remember me checkbox', async () => {
    renderForm()
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i })
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('renders forgot password link', () => {
    renderForm()
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument()
  })

  it('renders create account link pointing to /sign-up', () => {
    renderForm()
    expect(screen.getByRole('link', { name: /create an account/i })).toHaveAttribute(
      'href',
      '/sign-up',
    )
  })

  it('renders the visual side', () => {
    renderForm()
    expect(screen.getByText('Your agents are already working.')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    renderForm()
    const passwordInput = screen.getByPlaceholderText('••••••••')
    expect(passwordInput).toHaveAttribute('type', 'password')
    await userEvent.click(screen.getByRole('button', { name: /show password/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')
    await userEvent.click(screen.getByRole('button', { name: /hide password/i }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('shows validation error when email is empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('shows validation error when email is malformed', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail')
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'secret123')
    // bypass jsdom's native type="email" constraint so RHF/Zod validation runs
    fireEvent.submit(screen.getByRole('button', { name: /^log in$/i }).closest('form')!)
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  })

  it('shows validation error when password is empty', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  it('redirects to /dashboard on successful login', async () => {
    mockSignIn.mockResolvedValue({ error: null })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'))
  })

  it('shows server error message on auth failure', async () => {
    mockSignIn.mockResolvedValue({ error: { message: 'Invalid login credentials' } })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials')
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('clears server error on subsequent submit attempt', async () => {
    mockSignIn
      .mockResolvedValueOnce({ error: { message: 'Invalid login credentials' } })
      .mockResolvedValueOnce({ error: null })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    await screen.findByRole('alert')
    await userEvent.click(screen.getByRole('button', { name: /^log in$/i }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
  })
})
