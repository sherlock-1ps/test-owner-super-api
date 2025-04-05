/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/th/providers',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(th|en|fr|ar)',
        destination: '/:lang/providers',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:th|en|fr|ar|front-pages|favicon.ico)\\b)):path',
        destination: '/th/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
