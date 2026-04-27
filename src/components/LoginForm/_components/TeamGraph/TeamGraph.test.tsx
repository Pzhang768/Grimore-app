import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import type React from 'react'
import TeamGraph from './TeamGraph'

vi.mock('@/components/GrimChip', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

describe('TeamGraph', () => {
  it('renders the team label and running chip', () => {
    render(<TeamGraph />)
    expect(screen.getByText('team · job-search')).toBeInTheDocument()
    expect(screen.getByText('Running')).toBeInTheDocument()
  })

  it('renders all four node labels', () => {
    render(<TeamGraph />)
    expect(screen.getByText('Coordinator')).toBeInTheDocument()
    expect(screen.getByText('Fetcher')).toBeInTheDocument()
    expect(screen.getByText('Analyser')).toBeInTheDocument()
    expect(screen.getByText('Tailor')).toBeInTheDocument()
  })

  it('renders all four node roles', () => {
    render(<TeamGraph />)
    expect(screen.getByText('orchestrates')).toBeInTheDocument()
    expect(screen.getByText('finds listings')).toBeInTheDocument()
    expect(screen.getByText('scores fit')).toBeInTheDocument()
    expect(screen.getByText('rewrites resume')).toBeInTheDocument()
  })
})
