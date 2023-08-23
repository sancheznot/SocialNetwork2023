/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "upload.wikimedia.org"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
          },
        ],
      },
}

module.exports = nextConfig
