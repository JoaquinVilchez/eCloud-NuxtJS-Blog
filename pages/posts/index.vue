<template>
    <div class="posts-page">
      <PostList :posts="loadedPosts"/>
    </div>
</template>

<script>

import { Vue } from 'nuxt-property-decorator'
export default class extends Vuex{
  get loadedPosts(){
    return this.$store.getters.post.loadedPosts
  }
}
</script> 

<style scope>
.posts-page{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>