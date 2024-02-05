import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/api/search": "http://localhost:8001",
            // "/api/search": "https://search.benhong.me",
            // "/api/chat": "http://localhost:8000",
            // "/api/messages": "http://localhost:8000",
            "/api": "http://localhost:8000",
        },
    }
});
