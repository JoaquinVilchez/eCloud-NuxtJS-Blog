<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{loadedPost.title}}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on {{loadedPost.updatedDate}}</div>
                <div class="post-detail">Written by {{loadedPost.author}}</div>
            </div>
            <div>{{loadedPost.content}}</div>
        </section>
        <section class="post-feedback">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <a href="mailto:joaquinvilchez95@gmail.com">joaquinvilchez95@gmail.com</a></p>
        </section>
    </div>
</template> 

<script>
export default {
    asyncData(context, callback){
        setTimeout(()=>{
            callback(null, {
                loadedPost:{
                    id: "1", 
                    title: 'My title - ID: '+context.route.params.id,
                    previewText:'This is my preview text', 
                    author:'Joaquin',
                    updatedDate: new Date(),
                    content:'Some text',
                    thumbnail:'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg'
                }
            })
        }, 1000)
    }
}
</script>

<style scoped>
    .post{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .post-title{
        margin-bottom: 5px;
    }

    .post-details{
        color:grey;
        font-size: .8em;
        border-bottom: 2px solid grey;
        width: 400px;
        text-align: center;
        margin-bottom:10px;
        padding-bottom: 10px;
    }

    .post-feedback{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .post-feedback a{
        color: red;
    }
</style>