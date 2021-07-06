<template>
    <form @submit.prevent="onSave">
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
        <AppContolInput v-model="editedPost.title">Title</AppContolInput>
        <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail link</AppControlInput>
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

<script>
import AppControlInput from '@/components/UI/AppControlInput';
import AppButton from '@/components/UI/AppButton';
import AdminPostForm from '@/components/admin/AdminPostForm';
export default {
    components:{
        AppControlInput: AppControlInput,
        AppButton: AppButton,
        AdminPostForm: AdminPostForm
    },
    props:{
        post:{
            type: Object,
            required: false
        }
    },
    data(){
        return{
            editedPost: this.post 
            ? {...this.post} 
            : {
                author: '',
                title:'',
                thumbnailLink:'',
                content:''
            }
            
        }
    },
    methods:{
        onSave(){
            console.log(this.editedPost);
        },
        onCancel(){
            this.$router.push('/admin')
        }
    }
}
</script>