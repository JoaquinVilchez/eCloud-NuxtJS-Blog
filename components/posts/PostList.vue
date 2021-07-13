<template>
    <section class="post-list">
        <PostPreview
            v-for="post in posts"
            :key="post.id"
            :is-admin="isAdmin" 
            :post="post"
        />
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
  //FIXME: No se porque me da error en esa linea. Estimo que es configuracion de ts-config
    import PostPreview from '~/components/Posts/PostPreview.vue'
    export default Vue.extend({
        components:{
            PostPreview: PostPreview
        },
        props:{
            isAdmin: {
                type:Boolean,
                default:false
            },
            posts:{
                type:Array,
                required:true,
            }
        }
    })
</script>

<style scoped>
    .post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>    