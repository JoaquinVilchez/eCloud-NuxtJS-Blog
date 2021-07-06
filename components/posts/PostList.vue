<template>
    <section class="post-list">
        <PostPreview
            :is-admin="isAdmin" 
            id="1" 
            thumbnail="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            title="Hello title 1"
            previewText="First post"
            />
        <PostPreview
            :is-admin="isAdmin"
            id="2" 
            thumbnail="https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg"
            title="Hello title 2"
            previewText="Second post"
        />
        <PostPreview
            :is-admin="isAdmin"
            id="3" 
            thumbnail="https://www.gettyimages.es/gi-resources/images/frontdoor/editorial/Velo/GettyImages-Velo-1088643550.jpg"
            title="Hello title 3"
            previewText="Third post"
        />
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'
export default {
  components:{
    PostPreview: PostPreview
  },
  props:{
      isAdmin: {
          type:Boolean,
          default:false
      }
  }
}
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