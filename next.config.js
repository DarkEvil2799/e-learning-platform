/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_BASE_URL:   process.env.API_BASE_URL,
    API_UPLOAD_URL: process.env.API_UPLOAD_URL,
    API_FILE_URL:   process.env.API_FILE_URL,
  },
}
