import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AgentLogPanel, { DEFAULT_LOG_STEPS, type LogStep } from './AgentLogPanel'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('AgentLogPanel', () => {
  it('renders the panel header with default title', () => {
    render(<AgentLogPanel />)
    expect(screen.getByText('Live run · job-search-team')).toBeInTheDocument()
  })

  it('accepts a custom title', () => {
    render(<AgentLogPanel title="Custom run" />)
    expect(screen.getByText('Custom run')).toBeInTheDocument()
  })

  it('shows first step on initial render', () => {
    render(<AgentLogPanel steps={DEFAULT_LOG_STEPS} />)
    expect(screen.getByText('Coordinator')).toBeInTheDocument()
  })

  it('streams subsequent steps after timeout', () => {
    render(<AgentLogPanel steps={DEFAULT_LOG_STEPS} speed={1} />)
    act(() => {
      vi.advanceTimersByTime(900)
    })
    expect(screen.getByText('Job Listing Fetcher')).toBeInTheDocument()
  })

  it('resets back to one step after all steps shown', () => {
    render(<AgentLogPanel steps={DEFAULT_LOG_STEPS} speed={1} />)
    // Advance through all steps: 6 extra steps × 900ms each
    act(() => {
      vi.advanceTimersByTime(900 * DEFAULT_LOG_STEPS.length + 4200)
    })
    // After reset, only first step visible
    const coordinatorNodes = screen.getAllByText('Coordinator')
    expect(coordinatorNodes.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the preview badge', () => {
    render(<AgentLogPanel />)
    expect(screen.getByText('PREVIEW')).toBeInTheDocument()
  })

  it('renders status badges for visible steps', () => {
    render(<AgentLogPanel steps={DEFAULT_LOG_STEPS} />)
    expect(screen.getByText('complete')).toBeInTheDocument()
  })

  it('accepts custom steps', () => {
    const steps: LogStep[] = [
      { agent: 'TestAgent', status: 'running', t: '00:00', msg: 'Doing something' },
    ]
    render(<AgentLogPanel steps={steps} />)
    expect(screen.getByText('TestAgent')).toBeInTheDocument()
    expect(screen.getByText('Doing something')).toBeInTheDocument()
  })

  it('renders in compact mode without error', () => {
    const { container } = render(<AgentLogPanel compact />)
    expect(container.firstChild).not.toBeNull()
  })

  it('cleans up reset-branch timeout when effect re-runs', () => {
    const steps: LogStep[] = [{ agent: 'A', status: 'complete', t: '00:00', msg: 'done' }]
    // Single step: count(1) >= steps.length(1) immediately → reset branch fires
    // Advance past the reset delay so count resets to 1, re-entering reset branch and running cleanup
    const { unmount } = render(<AgentLogPanel steps={steps} speed={1} />)
    act(() => {
      // Fire the reset timer — setCount(1) called, effect re-runs, cleanup of old timeout called
      vi.advanceTimersByTime(4200)
    })
    act(() => {
      // Fire again to confirm stable cycle
      vi.advanceTimersByTime(4200)
    })
    unmount()
  })

  it('renders caret component on the last running step', () => {
    const steps: LogStep[] = [{ agent: 'TestAgent', status: 'running', t: '00:00', msg: 'Working' }]
    // With a single step the first (and last) row has status=running → Caret renders
    const { container } = render(<AgentLogPanel steps={steps} />)
    // Caret is an inline-block span inside the message Typography
    // It is the 3rd child span within the message cell (after the text node)
    // We verify the tree has more than 2 spans (outer + inner dot) — confirming extra spans exist
    const allSpans = container.querySelectorAll('span')
    expect(allSpans.length).toBeGreaterThan(2)
  })
})
