/** @type {import('next').NextConfig} */

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  env: {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  },
};

module.exports = nextConfig;
