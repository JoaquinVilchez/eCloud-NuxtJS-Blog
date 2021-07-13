import { Middleware } from '@nuxt/types'

const checkAuthMiddleware: Middleware = (context) => {
    if(!context.store.getters.isAuthenticated){
        context.redirect('/admin/auth')
    }
  }
  
export default checkAuthMiddleware