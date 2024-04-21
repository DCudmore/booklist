import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
  base: '/booklist/',
  plugins: [react(), vike({
    prerender: true
  })]
}

export default config
