<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create post</AppButton>
            <AppButton @click="onLogout">Logout</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Existings posts</h1>
            <PostList :posts="loadedPosts" isAdmin/>
        </section>
    </div>
</template>

<script>

import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout:'admin',
  middleware: ['check-auth','auth']
})


export default class extends Vue{
  get loadedPosts(){
    return this.$store.getters.post.loadedPosts
  }
  onLogout(){
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/auth')
  }
}
</script>


<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>