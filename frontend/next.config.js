const withPWA = require('next-pwa')({
	disable: process.env.NODE_ENV === 'development',

	dest: 'public',
	scope: '/',
	sw: 'sw.js', // Service worker file name
	register: true, // Register service worker

})
/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ]
    },
}

module.exports = withPWA(nextConfig)
