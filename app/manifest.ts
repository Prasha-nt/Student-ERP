import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Student App",
    short_name: "StudentApp",
    description: "A comprehensive student management app",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },
    ],
    // Additional PWA features for better notification support
    categories: ["education", "productivity"],
    lang: "en",
    dir: "ltr",
    prefer_related_applications: false,
    // These help with notification and PWA functionality
    permissions: ["notifications"],
    features: ["background-sync", "push-messaging"]
  }
}