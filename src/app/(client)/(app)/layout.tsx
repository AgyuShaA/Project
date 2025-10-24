import '@/config/styles/globals.css'

import { UiProvider } from '../../pkg/libraries/ui'
import RestApiProvider from '@/pkg/libraries/rest-api/rest-api.provider'
import { MixpanelPlrovider } from '@/pkg/integrations/mixpanel/mixpanel'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <body className='antialiased' suppressHydrationWarning>
        <UiProvider>
          <MixpanelPlrovider>
            <RestApiProvider>{children}</RestApiProvider>
          </MixpanelPlrovider>
        </UiProvider>
      </body>
    </html>
  )
}
