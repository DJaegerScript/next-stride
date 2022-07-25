const generateNextConfigContent =
  () => `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`

export default generateNextConfigContent
