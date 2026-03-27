import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ChatBubble from '@/components/common/ChatBubble';
import ConsoleMessage from '@/components/common/ConsoleMessage';
import Footer from '@/components/common/Footer';
import KonamiCode from '@/components/common/KonamiCode';
import { LenisRoot } from '@/components/common/LenisRoot';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-hanken-grotesk antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
  );
}
