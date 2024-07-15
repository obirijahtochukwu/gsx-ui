/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals.push(
      "encoding",
      "pino-pretty" /* add any other modules that might be causing the error */
    );
    return config;
  },
};
