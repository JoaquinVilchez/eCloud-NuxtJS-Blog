import Vuex from 'vuex'

interface PostStore {
    loadedPosts:Post[]
}

interface Post {
    id:String,
    author:String,
    title:String,
    previewText:String,
    thumbnailLink:String,
    content:String
}

const initialState: PostStore = {
    loadedPosts:[]  
}

export const state = (): PostStore => initialState

export const mutations = {
        setPosts(state:any,posts:Post){
            state.loadedPosts = posts
        },
        addPost(state:any, postData:Post){
            let id = (state.loadedPosts.length+1).toString()
            state.loadedPosts.push({
                id:id,
                author:postData.author,
                title:postData.title,
                previewText:postData.previewText,
                thumbnailLink:postData.thumbnailLink,
                content:postData.content
            })
        },
        updatePost(state:any,postData:Post){
            console.log(postData)
        },
}

export const actions = {
    nuxtServerInit(vuexContext:any, context:any) {
        //SIMULA TRAER INFO DE UNA API
        vuexContext.commit('setPosts', [
            {
                id: "1", 
                title: 'My title',
                previewText:'This is my preview text', 
                thumbnailLink:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                author:'Juan Perez',
                content: 'lorem ipsum asd'
            },
            {
                id: "2", 
                title: 'My second title',
                previewText:'This is my second preview text', 
                thumbnailLink:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                author:'Juan Perez',
                content: 'lorem ipsum asd'
            },
            {
                id: "3", 
                title: 'My third title',
                previewText:'This is my third preview text', 
                thumbnailLink:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg',
                author:'Juan Perez',
                content: 'lorem ipsum asd'
            }
        ])
        //SIMULA TRAER INFO DE UNA API  
    },
    setPosts(vuexContext:any, posts:Post[]){
        vuexContext.commit('setPosts', posts)
    },
    getPosts(vuexContext:any){
        console.log('GETPOSTS')
        return getters.loadedPosts
    }
}

const getters = {
    loadedPosts(state:any):Post[]{
        console.log('LOADED POSTS')
        return [
            {
                id:'10',
                author:'Joaquin',
                title:'Titulo post',
                previewText:'Probando',
                thumbnailLink:'asd.jpg',
                content:'lorem'
            }
        ]
        // return state.loadedPosts
    },
    getPostByID: (state:any) => (id:number):Post => {
        return state.loadedPosts.find(
            (post:any) => post.id == id
            //Hubiese puesto post:Post pero me da error...
        )
    },
}