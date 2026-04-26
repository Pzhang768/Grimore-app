import { Box } from '@mui/material'
import TopNav from '@/components/TopNav'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav />
      {children}
    </Box>
  )
}
