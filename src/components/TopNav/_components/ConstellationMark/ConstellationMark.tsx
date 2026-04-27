interface ConstellationMarkProps {
  size?: number
  accent?: string
  ink?: string
}

export default function ConstellationMark({
  size = 28,
  accent = '#00D4AA',
  ink = '#F0EEFF',
}: ConstellationMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <line x1="36" y1="36" x2="14" y2="20" stroke={ink} strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="36" y1="36" x2="58" y2="20" stroke={ink} strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="36" y1="36" x2="36" y2="60" stroke={ink} strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="14" cy="20" r="5" fill={ink} />
      <circle cx="58" cy="20" r="5" fill={ink} />
      <circle cx="36" cy="60" r="5" fill={ink} />
      <circle cx="36" cy="36" r="8" fill={accent} />
      <circle
        cx="36"
        cy="36"
        r="13"
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
    </svg>
  )
}
