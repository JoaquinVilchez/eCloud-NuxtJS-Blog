<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm v-if="postData" :post="postData"/>
        </section>
    </div>
</template>
 
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/admin/AdminPostForm'

@Component({
  layout:'admin',
  middleware: ['check-auth','auth'],
  components:{
      AdminPostForm
  },
})

export default class extends Vue {
  get postData(){
      return this.$store.getters.post.getPostByID(this.$route.params.postId)
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>