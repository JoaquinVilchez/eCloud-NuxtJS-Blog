<template>
    <form @submit.prevent="onSave">
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
        <AppControlInput v-model="editedPost.title">Title</AppControlInput>
        <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail link</AppControlInput>
        <AppControlInput v-model="editedPost.previewText">Preview text</AppControlInput>
        <AppControlInput 
            control-type="textarea"
            v-model="editedPost.content">Content</AppControlInput>
        <AppButton type="submit">Save</AppButton>
        <AppButton
            type="button"
            style="margin-left: 10px"
            btn-style="cancel"
            @click="onCancel">Cancel</AppButton
        >
    </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Post {
    id:String,
    author:String,
    title:String,
    thumbnailLink:String,
    previewText:String,
    content:String
}

export default Vue.extend({
    name: 'AdminPostForm',

    props:{
        post:{
            type: Object,
            required: false
        } as PropOptions<Post>
    },

    data(){
        return{
            editedPost: <Post> {
                id: '10',
                author: '',
                title:'',
                thumbnailLink:'',
                previewText:'',
                content:''
            }
        }
    },

    mounted:function(){
        if(this.post){
            this.editedPost = this.post
        }
    },

    methods:{
        onSave(){
            this.$emit('submit', this.editedPost)
        },
        onCancel(){
            this.$router.push('/admin')
        }
    }
})
</script>