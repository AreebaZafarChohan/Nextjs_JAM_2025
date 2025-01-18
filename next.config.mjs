/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["cdn.sanity.io"]
    },
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    },
    reactStrictMode: {
        reactStrictMode: false,
    },
};

export default nextConfig;
