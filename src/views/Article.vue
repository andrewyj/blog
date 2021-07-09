<template>
  <div>
    <div class="container">
      <h1 class="post-title">{{article.title}}</h1>
      <article class="post">
        <div class="markdown-body" v-highlight v-html="article.content">
        </div>
        <div class="center">{{article.created_at|formatDate}}</div>
        <div class="tags center">
          <router-link :to="'/?tag_id='+item.id" class="tag" 
          v-for="item in article.tags"
          v-bind:todo="item"
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
    <Comment v-bind:articleId="articleId" />
  </div>
</template>

<script>
import Comment from "@/components/comment"
import { fetchArticle } from '@/api/article'
import AOS from 'aos'
import { formatTimeToStr } from "@/utils/date";

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
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    }
  },
  mounted() {
    const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.target.offsetHeight > 0) {
          scrollTo(0,0)
          this.$isLoading(false)
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
            setTimeout(function(){ AOS.refresh() }, 100);
            this.article = response.data.article
            this.next = response.data.next
            this.prev = response.data.prev
            // this.$isLoading(false)
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
