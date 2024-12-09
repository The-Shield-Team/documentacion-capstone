import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: "Health Care Item Recognition",
				short_name: "HCIR",
				description: "Health Care Item Recognition",
				icons: [
					{
						src: "logo.jpeg",
						sizes: "512x512",
						type: "image/jpeg",
					},
				],
				theme_color: "#ffffff",
				background_color: "#ffffff",
				display: "standalone",
				orientation: "portrait",
			},
			devOptions: {
                enabled: true
            },
			workbox: {
				maximumFileSizeToCacheInBytes: 5000000, // 3MB in bytes
			}
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		port: 5174,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	preview: {
		port: 5173,
	},
});
