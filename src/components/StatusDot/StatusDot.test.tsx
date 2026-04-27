import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatusDot from './StatusDot'

describe('StatusDot', () => {
  it('renders without crashing', () => {
    const { container } = render(<StatusDot />)
    expect(container.firstChild).not.toBeNull()
  })

  it('renders a single dot for idle (no pulse)', () => {
    const { container } = render(<StatusDot status="idle" />)
    // idle has no pulse ring — only the inner dot span
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(2) // outer wrapper + inner dot
  })

  it('renders a pulse ring for running', () => {
    const { container } = render(<StatusDot status="running" />)
    // running has outer wrapper + pulse ring + inner dot
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(3)
  })

  it('renders a pulse ring for waiting', () => {
    const { container } = render(<StatusDot status="waiting" />)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(3)
  })

  it('renders a single dot for complete (no pulse)', () => {
    const { container } = render(<StatusDot status="complete" />)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(2)
  })

  it('renders a single dot for error (no pulse)', () => {
    const { container } = render(<StatusDot status="error" />)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(2)
  })

  it('applies custom size', () => {
    const { container } = render(<StatusDot size={12} />)
    expect(container.firstChild).not.toBeNull()
  })
})
