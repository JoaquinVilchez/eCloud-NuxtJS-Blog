import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[],
            token: null
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts
            },
            addPost(state,postData){
                let id = (state.loadedPosts.length+1).toString()
                state.loadedPosts.push({
                    id:id,
                    author:postData.author,
                    title:postData.title,
                    previewText:postData.previewText,
                    thumbnail:postData.thumbnailLink,
                    content:postData.content
                })
            },
            updatePost(state,postData){
                console.log(postData)
            },
            setToken(state, token){
                state.token = token
            },
            clearToken(state){
                state.token = null
            }
        },
        actions:{
            nuxtServerInit(vuexContext, context) {
                //SIMULA TRAER INFO DE UNA API
                vuexContext.commit('setPosts', [
                    {
                        id: "1", 
                        title: 'My title',
                        previewText:'This is my preview text', 
                        thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                        author:'Juan Perez',
                        content: 'lorem ipsum asd'
                    },
                    {
                        id: "2", 
                        title: 'My second title',
                        previewText:'This is my second preview text', 
                        thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                        author:'Juan Perez',
                        content: 'lorem ipsum asd'
                    },
                    {
                        id: "3", 
                        title: 'My third title',
                        previewText:'This is my third preview text', 
                        thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                        author:'Juan Perez',
                        content: 'lorem ipsum asd'
                    }
                ])
                //SIMULA TRAER INFO DE UNA API  
            },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            },
            authenticateUser(vuexContext, authData){
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.fbAPIKey
                if(!authData.isLogin){
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.fbAPIKey
                }
                return this.$axios.post(authUrl, {
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken: true
                }).then(result=>{
                    vuexContext.commit('setToken', result.data.idToken)
                    localStorage.setItem('token', result.data.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn)*1000)

                    Cookie.set('jwt', result.data.idToken)
                    Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn)*1000)

                    vuexContext.dispatch('setLogoutTimer', result.data.expiresIn*1000)
                    return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'authenticated'})
                })
                .catch(e=>console.log(e))
            },
            setLogoutTimer(vuexContext, duration){
                setTimeout(()=>{
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext, req){
                let token
                let expirationDate

                console.log('CONTEXT: ', req)
                if(req){ 
                    if(!req.headers.cookie){
                        return  
                    }
                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c=>c.trim().startsWith('jwt='))
                        .split('=')[1]

                    if(!jwtCookie){
                        return
                    }

                    //cookie-universal

                    token = jwtCookie.split('=')[1]
                    expirationDate = req.headers.cookie
                        .split(';')
                        .find(c=>c.trim().startsWith('jwt='))

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
            logout(vuexContext){
                vuexContext.commit('clearToken');   
                Cookie.remove('jwt')
                Cookie.remove('expirationDate')
                if(process.client){
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
0           }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            },
            getPostByID: (state) => (id) => {
                return state.loadedPosts.find(
                    post => post.id == id
                )
            },
            isAuthenticated(state){
                return state.token != null
            }
        }
    })
}

export default createStore
