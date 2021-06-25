<template>
  <div>
    <div class="search-form search-form-modal" :class="isVisible">
      <div class="search-form-inner">
        <div class="filter-container">
            <input
              type="text"
              autocomplete="off"
              :placeholder="getTitle()"
              name="keyword"
              v-model="listQuery.keyword"
              v-on:keyup="onSearch"
            />
            <ul class="search-filtered" v-if="list">
              <li v-for="item in list" v-bind:item="item" v-bind:key="item.id" v-on:click="resetQuery(true)">
                <router-link :to="getRoute(item.id)">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
      </div>
      <div id="mask" v-on:click="isVisible = ''"></div>
    </div>

    <div class="hebin" data-aos="fade-down">
      <i class="js-toggle-search iconfont" v-on:click="isVisible = 'is-visible'" data-aos="fade-down">&#xe60e;</i>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { fetchPhotos } from '@/api/photo'

export default {
  name: "Search",
  data() {
    return {
      isVisible: "",
      listQuery: {
        page: 1,
        keyword: ""
      },
      list: [],
      total_page: 0,
      timeoutId:null,
      searchArticle: true
    };
  },
  watch: { 
    '$route': {
        handler() {
          this.searchArticle = true
          if (this.$route.path == '/photos') {
            this.searchArticle = false
          }
        },
        deep: true,
        immediate: true,
      } 
  },
  methods: {
    onSearch($e) {
      if (!this.listQuery.keyword) {
        this.list = []
        return
      }
      if ($e.keyCode == 13) {
        this.resetQuery(true)
        this.$router.push(this.route+'?keyword='+this.listQuery.keyword)
        return
      }
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
          this.getList()
      }, 800);
    },
    getList() {
      if (this.searchArticle) {
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list
          this.totalPage = response.data.total_page
          this.listQuery.page = response.data.page
        })
      } else {
        fetchPhotos(this.listQuery).then(response => {
          this.list = response.data.list
          this.totalPage = response.data.total_page
          this.listQuery.page = response.data.page
        })
      }
    },
    resetQuery(close) {
      if (close) {
        this.isVisible = ''
      }
      setTimeout(()=>{
        this.list = []
        this.listQuery.keyword = ''
      }, 800)
      clearTimeout(this.timeoutId)
    },
    getTitle() {
      return this.searchArticle ? '文章、标题、分类、描述...' : '图片、标题、标签、描述...'
    },
    getRoute(id) {
      id = id ? '/'+id : ''
      let path = this.searchArticle ? '/article'+id : '/photos'+id
      if (this.listQuery.keyword) {
        path += '?keyword='+this.listQuery.keyword
      }
      return path
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/search.scss";
</style>


