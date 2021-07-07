<template>
    <div class="posts-page">
      <PostList :posts="loadedPosts"/>
    </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
export default {
  components:{
    PostList: PostList
  },
  computed:{
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
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