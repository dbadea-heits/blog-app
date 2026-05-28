import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: __dirname,
  },
}

export default withMDX(nextConfig)
