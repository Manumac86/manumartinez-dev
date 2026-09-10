/** @type {import('next').NextConfig} */
const nextConfig = {
  // Posts are read from disk at request time; make sure they ship with the server bundle.
  outputFileTracingIncludes: {
    "/**": ["./content/posts/**/*"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
}

export default nextConfig
