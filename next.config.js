/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },{
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },{
        protocol: "https",
        hostname: "galleryapp2024.s3.amazonaws.com",
      }
    ],
  },
};

module.exports = nextConfig;
