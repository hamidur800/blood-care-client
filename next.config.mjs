/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["lh3.googleusercontent.com"], // allow Google profile images
  },
};

export default nextConfig;
