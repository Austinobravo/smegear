/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'sme-gear.s3.amazonaws.com',
                protocol: 'https',
                
            }
        ]
    }
};

export default nextConfig;