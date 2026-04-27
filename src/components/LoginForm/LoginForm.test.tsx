import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
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

function renderForm() {
  return render(<LoginForm />)
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email, password fields and submit button', () => {
    renderForm()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders sign up link', () => {
    renderForm()
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/sign-up')
  })

  it('shows validation error when email is empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('shows validation error when email is malformed', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    // bypass jsdom's native type="email" constraint so RHF/Zod validation runs
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }).closest('form')!)
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  })

  it('shows validation error when password is empty', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  it('redirects to /dashboard on successful login', async () => {
    mockSignIn.mockResolvedValue({ error: null })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'))
  })

  it('shows server error message on auth failure', async () => {
    mockSignIn.mockResolvedValue({ error: { message: 'Invalid login credentials' } })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials')
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('clears server error on subsequent submit attempt', async () => {
    mockSignIn
      .mockResolvedValueOnce({ error: { message: 'Invalid login credentials' } })
      .mockResolvedValueOnce({ error: null })
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await screen.findByRole('alert')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
  })
})
