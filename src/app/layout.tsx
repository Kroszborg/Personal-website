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
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body className="font-hanken-grotesk antialiased">
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
        </body>
      </html>
    </ViewTransitions>
  );
}
