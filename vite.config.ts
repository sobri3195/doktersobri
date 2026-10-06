import {defineConfig} from 'vite';
export default defineConfig({
  build:{
    target:'es2022',
    rollupOptions:{output:{manualChunks:(id:string)=>id.includes('node_modules/react')?'vendor':id.includes('node_modules/three')?'three':undefined}}
  },
  server:{host:true}
});
