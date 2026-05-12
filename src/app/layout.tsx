import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ChatBubble from '@/components/common/ChatBubble';
import ConsoleMessage from '@/components/common/ConsoleMessage';
import Footer from '@/components/common/Footer';
import KonamiCode from '@/components/common/KonamiCode';
import { LenisRoot } from '@/components/common/LenisRoot';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ShaderBackground } from '@/components/common/ShaderBackground';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetadata('/');

// Inline script to prevent theme flash/stuck issues
function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var stored = localStorage.getItem('portfolio-theme');
              if (stored) {
                if (stored === 'dark') document.documentElement.classList.add('dark');
                else if (stored === 'light') document.documentElement.classList.remove('dark');
              } else {
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeInitializer />
        </head>
        <body className="font-hanken-grotesk antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="portfolio-theme"
          >
            <ShaderBackground />
            <LenisRoot>
              <Navbar />
              {children}
              <OnekoCat />
              <Quote />
              <Footer />
              <ChatBubble />
              <KonamiCode />
              <ConsoleMessage />
              <UmamiAnalytics />
              <SpeedInsights />
              <Analytics />
            </LenisRoot>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
