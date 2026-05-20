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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DevCheatsheet",
    "description": "Instant access to cheatsheets for JavaScript, Python, CSS, Git, React, and more. The go-to quick reference hub for developers of all levels.",
    "url": "https://dev-cheatsheet.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dev-cheatsheet.vercel.app?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
