"use client"

import { useState } from "react"

type CopyTokenButtonProps = {
  token: string
}

export function CopyTokenButton({ token }: CopyTokenButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="cursor-pointer self-start border border-hairline px-4 py-2 font-sans text-[0.75rem] tracking-[0.14em] uppercase text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] hover:border-copper hover:text-copper"
    >
      {copied ? "Copied" : "Copy token"}
    </button>
  )
}