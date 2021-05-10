<template>
  <div>
    <div class="container">
      <article class="post">
        <h1 class="center post-title">{{article.title}}</h1>
        <div class="markdown-body" v-highlight v-html="article.article_detail.content">
        </div>
        <div class="center">{{article.created_at}}</div>
        <div class="tags center">
          <router-link :to="'/?tagId='+item.id" class="tag" 
          v-for="item in article.tags"
          v-bind:todo="item"
          v-bind:key="item.id">{{item.name}}</router-link>
        </div>
        
        <div class="post-nav cf">
          <div class="post-nav-next post-nav-item">
              <a href="/2021/03/15/go/gorm-optimistic/" rel="next" title="写了一个 gorm 乐观锁插件">
                <i class="iconfont"></i> 写了 gorm 乐观锁插件
              </a>
          </div>
          <div class="post-nav-prev post-nav-item">
              <a href="/2021/04/18/pulsar/pulsar-start/" rel="prev" title="Pulsar 入门及介绍">
                Pulsar 入门及介绍 <i class="iconfont"></i>
              </a>
          </div>
        </div>
      </article>
    </div>
    <bl-comment />
  </div>
</template>

<script>
import Comment from "@/components/comment";
import { fetchArticle } from '@/api/article'
export default {
  name: "Article",
  data() {
    return {
      tag_name: '',
      category_name: '',
      article: {
        title: '',
        article_detail: {
          content: ''
        },
        tags: []
      }
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    fetchArticle(id).then(response => {
        this.article = response.data.article
      }).catch(err => {
        this.$Alert.message({
        content: err.message,
        duration: 3
      });
        return
    })
  },
  components: {
    "bl-comment": Comment,
  },
  methods: {
  },
};
</script>

<style scoped>
@import "~@/style/github-markdown.css";
</style>

<style lang="scss">
@import "~@/style/article.scss";
</style>
