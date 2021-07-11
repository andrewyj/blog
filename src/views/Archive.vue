<template>
  <div class="container">
    <h1 class="post-title">归档</h1>
    <div class="post-archive">
      <div class="archive-items">
        <div class="archive-title" v-for="(items, index) in archives" v-bind:item="items" v-bind:key="index">
          <h3>{{index}}</h3>
          <div class="archives " v-for="item in items" v-bind:item="item" v-bind:key="item.id">
            <div class="brick">
              <router-link :to="'/article/'+item.id"><span class="time">{{item.created_at|formatDate}}</span>{{item.title}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loadMore :isLoading="isLoading" :totalPage="totalPage" @nextPage="nextPage"/>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import loadMore from "@/components/loadMore"
import { formatTimeToStr } from "@/utils/date";

export default {
  name: "Archive",
  data() {
    return {
      archives: {},
      totalPage: 0,
      isLoading: false,
      query: {
        page:1
      },
      pageSize: 20,
    };
  },
  components: {
    loadMore
  },
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "MM-dd");
      } else {
        return "";
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.getArchives();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getArchives() {
      this.isLoading = true;
      let vm = this;
      fetchList(this.query).then((response) => {
          this.totalPage = response.data.total_page
          response.data.list.forEach(function (article) {
            article.created_at = article.created_at.replace(/-/g, "/")
            var date = new Date(article.created_at);
            let year = formatTimeToStr(date, "yyyy-MM")
            if (!vm.archives[year]) {
              vm.archives[year] = []
            }
            vm.archives[year].push(article)
          });
          this.$forceUpdate();
          this.isLoading = false;
        })
        .catch(function () {
          if (this.query.page > 1) {
            --this.query.page
          }
          vm.isLoading = false
        });
    },
    nextPage(page) {
      this.query.page = page
      this.getArchives()
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/archive.scss";
</style>
