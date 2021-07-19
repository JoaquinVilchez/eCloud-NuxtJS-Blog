<template>
    <div class="admin-new-post-page">
        <section class="new-post-form">
            <AdminPostForm @submit="onSubmitted"/>
        </section>
    </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/admin/AdminPostForm';

@Component({
layout:'admin',
    middleware: ['check-auth','auth'],
    components:{
        AdminPostForm
    },
})

export default class extends Vuex{

  onSubmitted(postData){
    this.$store.commit('post/addPost', postData)
    this.$router.push('/')
  }

}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>