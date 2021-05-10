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

  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { formatTimeToStr } from "@/utils/date";
import AOS from 'aos'

export default {
  name: "Archive",
  data() {
    return {
      archives: {},
      totalPage: 0,
      page: 1,
      pageSize: 20,
    };
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
      this.$isLoading(true);
      let vm = this;
      fetchList().then((response) => {
          scrollTo(0,0)
          setInterval(function(){ AOS.refresh() }, 100);
          this.$isLoading(false);
          let vm = this
          response.data.list.forEach(function (article) {
            var date = new Date(article.created_at);
            let year = formatTimeToStr(date, "yyyy-MM")
            if (!vm.archives[year]) {
              vm.archives[year] = []
            }
            vm.archives[year].push(article)
          });
          this.$forceUpdate();
        })
        .catch(function () {
          vm.$isLoading(false);
        });
    },
  },
};
</script>
<style lang="scss">
@import "~@/style/archive.scss";
</style>
