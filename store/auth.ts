import { $axios } from '@/utils/api'

//Instale el universal cookies y se rompio

interface authData{
    isLogin: Boolean,
    email: String,
    password: String,
}

export const state = {
    token: null
}

export const mutations = {
    setToken(state:any, token:string){
        state.token = token
    },
    clearToken(state:any){  
        state.token = null
    }
}

export const actions = {
    authenticateUser(vuexContext:any, authData:authData):Object{
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.fbAPIKey
        if(!authData.isLogin){
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.fbAPIKey
        }
        return $axios.post(authUrl, {
            email:authData.email,
            password:authData.password,
            returnSecureToken: true
        }).then((result:any)=>{
            console.log(new Date().getTime())
            console.log(Number.parseInt(result.data.expiresIn))
            console.log(Number.parseInt(result.data.expiresIn)*1000)
            vuexContext.commit('setToken', result.data.idToken)
            localStorage.setItem('token', result.data.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn)*1000)

            $cookies.set('jwt', result.data.idToken)
            $cookies.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn)*1000)

            vuexContext.dispatch('setLogoutTimer', result.data.expiresIn*1000)
            return $axios.$post('http://localhost:3000/api/track-data', {data: 'authenticated'})
        })
        .catch(e=>console.log(e))
    },
    setLogoutTimer(vuexContext:any, duration:number){
        setTimeout(()=>{
            vuexContext.commit('clearToken')
        }, duration)
    },
    initAuth(vuexContext:any, req:any){
        let token
        let expirationDate

        if(req){ 
            if(!req.headers.cookie){
                return  
            }
            const jwtCookie = req.headers.cookie
                .split(';')
                .find((c:any)=>c.trim().startsWith('jwt='))
                .split('=')[1]

            if(!jwtCookie){
                return
            }

            token = jwtCookie.split('=')[1]
            expirationDate = req.headers.cookie
                .split(';')
                .find((c:string)=>c.trim().startsWith('jwt='))

        }else{
            token = localStorage.getItem("token")
            expirationDate = localStorage.getItem("tokenExpiration")
        }
        //El + adelante de una variable lo convierte a numero.
        if(new Date().getTime() > +expirationDate || !token){
            console.log('No token or invalid token')
            vuexContext.dispatch('logout')
            return
        }
        
        vuexContext.commit('setToken', token)
    },
    logout(vuexContext:any){
        vuexContext.commit('clearToken');   
        $cookies.remove('jwt')
        $cookies.remove('expirationDate')
        if(process.client){
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
        }
    }
}

export const getters = {
    isAuthenticated(state:any){
        return state.token != null
    }
}

