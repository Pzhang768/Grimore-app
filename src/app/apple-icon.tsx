import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: 40,
        background: '#1A1635',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="140" height="140" viewBox="2 8 68 56" fill="none">
        <line
          x1="36"
          y1="36"
          x2="14"
          y2="20"
          stroke="#F0EEFF"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />
        <line
          x1="36"
          y1="36"
          x2="58"
          y2="20"
          stroke="#F0EEFF"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />
        <line
          x1="36"
          y1="36"
          x2="36"
          y2="60"
          stroke="#F0EEFF"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />
        <circle cx="14" cy="20" r="7" fill="#F0EEFF" />
        <circle cx="58" cy="20" r="7" fill="#F0EEFF" />
        <circle cx="36" cy="60" r="7" fill="#F0EEFF" />
        <circle cx="36" cy="36" r="11" fill="#00D4AA" />
        <circle
          cx="36"
          cy="36"
          r="17"
          fill="none"
          stroke="#00D4AA"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </svg>
    </div>,
    { ...size },
  )
}
