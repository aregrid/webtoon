/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix:
  //   process.env.NODE_ENV === "production"
  //     ? "https://webtoon-nextjs-app-examples.vercel.app/"
  //     : "",
  env: {
    siteName: "LlamaGen.Ai",
    siteTitle:
      "LlamaGen.Ai | OPEN-SOURCE EXAMPLES for Dream Makers, create your own comics, webtoon, manga and manhwa online with AI",
    siteDescription:
      "LlamaGen.Ai offers a free ai comic generator, ai image generator, and ai animation generator. It simplifies and accelerates your comics, webtoon, manga, and manhwa creation process. Focus on crafting consistent characters inspired by Marvel, DC, Anime, or Manga aesthetics, and control their pose, composition, and style.",
    siteKeywords:
      "AI Comic, comic ai, AI image, ai comic factory hugging face, ai comic generator, ai Graphic Novels, ai Graphic Novels generator, anime art generator, AI art, AI manga, AI manhwa, webcomics online, digital art, text to image, Generative AI, Stable Diffusion, Dalle, Midjourney, ai generated animation free, free ai image generator, free ai art maker, OPEN-SOURCE EXAMPLES",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects(){
    return [
      {
        source: "/",
        destination: "/docs/overview",
        permanent: true,
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/llamagen_ai/examples",
  //       destination: "https://webtoon-nextjs-app-examples.vercel.app/",
  //     },
  //     {
  //       source: "/llamagen_ai/examples/:path*",
  //       destination:
  //         "https://webtoon-nextjs-app-examples.vercel.app/examples/:path*",
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.llamagen.ai",
      },
    ],
  },
};

export default nextConfig;
