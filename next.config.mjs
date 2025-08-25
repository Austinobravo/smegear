/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'sme-gear.s3.amazonaws.com',
                protocol: 'https',
                
            },
               {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',            // or `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`
      },
        ]
    }
};

export default nextConfig;