import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import type React from 'react'
import VisualSide from './VisualSide'

vi.mock('@/components/GrimChip', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

describe('VisualSide', () => {
  it('renders the heading', () => {
    render(<VisualSide />)
    expect(screen.getByText('Your agents are already working.')).toBeInTheDocument()
  })

  it('renders the subtext', () => {
    render(<VisualSide />)
    expect(screen.getByText(/running in parallel while you sleep/i)).toBeInTheDocument()
  })

  it('renders the team graph', () => {
    render(<VisualSide />)
    expect(screen.getByText('team · job-search')).toBeInTheDocument()
  })
})
