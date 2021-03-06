<template>
  <div>
    <div class="container">
      <h1 class="post-title">{{article.title}}</h1>
      <article class="post">
        <div class="markdown-body" v-highlight v-html="article.content">
        </div>
        <div class="center">{{article.created_at}}</div>
        <div class="tags center">
          <router-link :to="'/?tag_id='+item.id" class="tag" 
          v-for="item in article.tags"
          v-bind:key="item.id">{{item.name}}</router-link>
        </div>
        
        <div class="post-nav cf">
          <div class="post-nav-next post-nav-item">
            <router-link :to="getRouteUrl(next.id)" class="status-btn" v-if="next.id">
              <i class="iconfont">&#xe6a0;</i>{{next.title}}
            </router-link>
          </div>
          <div class="post-nav-prev post-nav-item">
            <router-link :to="getRouteUrl(prev.id)" class="status-btn" v-if="prev.id">
              {{prev.title}}<i class="iconfont">&#xe69f;</i>
            </router-link>
          </div>
        </div>
      </article>
    </div>
    <Comment v-bind:articleId="articleId" :loading="false" />
  </div>
</template>

<script>
import Comment from "@/components/comment"
import { fetchArticle } from '@/api/article'
import AOS from 'aos'

export default {
  name: "Article",
  data() {
    return {
      articleId: 0,
      next: {id:0},
      prev: {id:0},
      article: {},
      query: {
        category_id: '',
        tag_id: '',
        keyword: ''
      },
    };
  },
  mounted() {
    const vm = this
    const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.target.offsetHeight > 100) {
          vm.$isLoading(false)
          scrollTo(0,0)
        }
      }
    });
    resizeObserver.observe(document.querySelector('.markdown-body'));
  },
  watch: { 
    '$route': {
        handler() {
          let vm = this
          this.articleId = this.$route.params && this.$route.params.id
          this.query.keyword = this.$route.query.keyword
          this.query.category_id = this.$route.query.category_id
          this.query.tag_id = this.$route.query.tag_id
          this.$isLoading(true)
          fetchArticle(this.articleId, this.query).then(response => {
            this.article = response.data.article
            this.next = response.data.next ? response.data.next : {id:0, title: ''}
            this.prev = response.data.prev ? response.data.prev : {id:0, title: ''}
            setTimeout(function(){ AOS.refresh(); }, 100);
          }).catch(function() {
            vm.$isLoading(false)
          })
        },
        deep: true,
        immediate: true,
      } 
  },
  components: {
    Comment
  },
  methods: {
    getRouteUrl(articleId) {
      let url = '/article/'+articleId
      let query = ''
      if (this.query.keyword) {
        query += 'keyword='+this.query.keyword
      }
      if (this.query.tag_id) {
        query += 'tag_id='+this.query.tag_id
      }
      if (this.query.category_id) {
        query += 'category_id='+this.query.category_id
      }
      if (query) {
        url = url+'?'+query
      }
      
      return url
    }
  },
};
</script>

<style scoped>
@import "~@/style/github-markdown.css";
</style>

<style lang="scss">
@import "~@/style/article.scss";
</style>
