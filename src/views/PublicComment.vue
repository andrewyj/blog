<template>
  <div>
    <div class="container">
        <h1 class="post-title">街坊留言</h1>
    </div>
    <Comment v-bind:articleId="0" />
  </div>
</template>

<script>
import Comment from "@/components/comment"

export default {
  name: "PublicComment",
  components: {Comment}
}
</script>
