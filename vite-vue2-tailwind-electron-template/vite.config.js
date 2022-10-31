import { createVuePlugin } from 'vite-plugin-vue2'
import requireTransform from 'vite-plugin-require-transform';
import path from 'path'

export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 是否开启 https
    https: false,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.css', '.ts', '.jsx']
  },
  base: './',
  plugins: [
    createVuePlugin(),
    requireTransform({
      fileRegex: /.ts$|.tsx$|.vue$/
    })]
}