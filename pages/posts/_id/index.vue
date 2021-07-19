<template>
    <div class="single-post-page">
            <section class="post">
                <h1 class="post-title">{{postData.title}}</h1>
                <div class="post-details">
                    <div class="post-detail">Last updated on {{postData.updatedDate | date}}</div>
                    <div class="post-detail">Written by {{postData.author}}</div>
                </div>
                <div>{{postData.content}}</div>
            </section>
            <section class="post-feedback">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <a href="mailto:joaquinvilchez95@gmail.com">joaquinvilchez95@gmail.com</a></p>
            </section>
    </div>
</template> 

<script>
import { Vue } from 'nuxt-property-decorator'
export default class extends Vuex{
    get postData(){
        return this.$store.getters.post.getPostByID(this.$route.params.id)
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