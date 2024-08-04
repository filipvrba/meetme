import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
      server: {
        proxy: {
          '/api': {
            target: 'https://meetme-three.vercel.app',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    };
  }
  
  return {};
});