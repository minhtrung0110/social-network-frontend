/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        // port: '4000',
        // // pathname: '/photos/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // port: '4000',
        // // pathname: '/photos/**'
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
