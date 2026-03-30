import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "../lib/posthog-provider";
import SmoothScroll from "../components/ui/SmoothScroll";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link 
            href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" 
            rel="stylesheet" 
          />
        </head>
        <body className="antialiased font-plus-jakarta bg-background text-white selection:bg-primary selection:text-background flex flex-col min-h-screen relative" suppressHydrationWarning>
          <div className="mesh-gradient" />
          <PHProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </PHProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


