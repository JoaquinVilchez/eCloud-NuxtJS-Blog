<template>
    <div class="posts-page">
        <PostList/>
    </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
export default {
  components:{
    PostList: PostList
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