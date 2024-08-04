import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: {
        '/api': {
          target: mode === 'development' ? 'http://localhost:3000' : 'https://meetme-three.vercel.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});