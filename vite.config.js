import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    outDir: 'public', // имя общей выходной директории
    assetsDir: 'js' // имя директории со статикой
  },
  plugins: [react()],
  server: {
    open: true,
  },
})
