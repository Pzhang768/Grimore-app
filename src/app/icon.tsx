import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: '#1A1635',
        border: '1px solid #2D2852',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="26" height="26" viewBox="2 8 68 56" fill="none">
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
