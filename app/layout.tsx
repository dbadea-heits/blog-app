import "./globals.css"
import { Cormorant_Garamond, Inter_Tight } from "next/font/google"
import { Providers } from "./components/SessionProvider"
import { Nav } from "./components/NavBar"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-loaded",
  display: "swap",
})

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-loaded",
  display: "swap",
})

export const metadata = {
  title: "blog — a quiet anthology",
  description:
    "A quiet anthology for writers and readers who believe a sentence should earn its place.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <Nav />
          <div
            data-testid="notification"
            className="mx-auto max-w-[1400px] px-12 pt-3 text-right font-sans text-[0.72rem] tracking-[0.08em] uppercase text-warm max-[900px]:px-6"
          >
            System ready
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
