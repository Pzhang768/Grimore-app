import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import VisualSide from './VisualSide'

vi.mock('../TeamGraph', () => ({
  default: () => <div data-testid="team-graph" />,
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
    expect(screen.getByTestId('team-graph')).toBeInTheDocument()
  })
})
