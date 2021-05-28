<template>
  <div class="pagination">
   <a href="javascript:;" v-if="this.page < this.totalPage">
    <i v-if="!isLoading" @click="nextPage()" class="iconfont">&#xe605;</i>
    <img v-if="isLoading" style="width: 50px" src="../image/loading.gif">
   </a>
  </div>
</template>

<script>
export default {
  name: "LoadMore",
  data() {
    return {
      page:1
    };
  },
  props: [
    'totalPage',
    'isLoading'
  ],
  methods: {
    nextPage() {
      if (this.page >= this.totalPage) {
        return
      }
      console.log(this.page)
      ++this.page
      this.$emit("nextPage", this.page)
    },
  },
};
</script>
<style scoped>
.pagination {
	position: relative;
	display: block;
	text-align: center;
	width: 300px;
	margin: 0 auto
}

.pagination i {
	font-size: 40px
}
</style>


