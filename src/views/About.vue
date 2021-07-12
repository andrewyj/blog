<template>
  <div>
    <div class="container">
        <h1 class="post-title">关于</h1>
        <div class="post">
          <div class="markdown-body" v-highlight v-html="settings.introduction"></div>
        </div>
    </div>
    <Comment v-bind:articleId="0" />
  </div>
</template>

<script>
import Comment from "@/components/comment"
import { mapGetters } from 'vuex'

export default {
  name: "PublicComment",
  components: {Comment},
    computed: {
    ...mapGetters([
      'settings',
    ])
  },
}
</script>
<style scoped>
@import "~@/style/github-markdown.css";
</style>