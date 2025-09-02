import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '',
  plugins: [react()],
  build: {
    outDir: '.',
    emptyOutDir: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  }
});
