import { ReactNode } from 'react';
import '../styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';



interface RootLayoutProps {
  children: ReactNode,
  session: any
}

export const metadata = {
  title: 'Promptly',
  description: 'Promptly is a simple tool to help you share your chatGPT and ai art prompts  with the world.',
}

export default function RootLayout({
  children,
  session
}: RootLayoutProps) {
  
  return (
    <html lang='en'>
      <head>
        <link rel="shortcut icon" href="/assets/icons/terminal.svg" type="image/x-icon/svg" />
      </head>
      <body>
        <Provider session={session}>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <Nav />
          <main className='app'>
            {children}
          </main>
        </Provider>
        {/* <Footer /> */}
      </body>
    </html>
  )
}

