/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    PGHOST: "ep-winter-wind-935555.us-east-2.aws.neon.tech",
    PGDATABASE: "book",
    PGUSER: "azizijunaid",
    PGPASSWORD: "OzB2lREZbN9r",
  },
};

module.exports = nextConfig;
