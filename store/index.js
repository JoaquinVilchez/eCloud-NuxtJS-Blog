import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts
            }
        },
        actions:{
            nuxtServerInit(vuexContext, context) { 
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        vuexContext.commit('setPosts', [
                            {
                                id: "1", 
                                title: 'My title',
                                previewText:'This is my preview text', 
                                thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg'
                            },
                            {
                                id: "2", 
                                title: 'My second title',
                                previewText:'This is my second preview text', 
                                thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg'
                            },
                            {
                                id: "3", 
                                title: 'My third title',
                                previewText:'This is my third preview text', 
                                thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg'
                            }
                        ])
                        resolve()
                    },1000)
                })
                .then(data=>{
                    context.store.commit('setPosts', data.loadedPosts)
                })
                .catch(e=>{
                    context.error(e)
                })
            },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    })
}

export default createStore
