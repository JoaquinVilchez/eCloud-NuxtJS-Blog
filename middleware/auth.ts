import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context) => {
    if(!context.store.getters.isAuthenticated){
        context.redirect('/admin/auth')
    }
  }
  
export default authMiddleware