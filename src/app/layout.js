import Script from 'next/script';

export const metadata = {
  title: 'DevCheatsheet | Quick Reference Guides for Developers',
  description: 'Instant access to cheatsheets for JavaScript, Python, CSS, Git, React, and more. The go-to quick reference hub for developers of all levels.',
  keywords: ['developer cheatsheet', 'javascript cheatsheet', 'python cheatsheet', 'css reference', 'git commands', 'react hooks', 'coding quick reference', 'programming guide'],
  authors: [{ name: 'DevCheatsheet' }],
  other: {
    'google-adsense-account': 'ca-pub-7322019754286753'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    title: 'DevCheatsheet | Quick Reference Guides for Developers',
    description: 'Instant access to cheatsheets for JavaScript, Python, CSS, Git, React, and more. Built for developers who value speed.',
    siteName: 'DevCheatsheet',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCheatsheet | Quick Reference for Developers',
    description: 'Cheatsheets for JavaScript, Python, CSS, Git, React and more — all in one place.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7322019754286753"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
