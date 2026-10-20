/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // <-- Agrega esta línea
  images: {
    unoptimized: true,
  },
};

export default nextConfig;