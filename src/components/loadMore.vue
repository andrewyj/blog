<template>
  <div class="pagination" v-if="isLoading || this.page < this.totalPage">
   <div>
    <i v-if="!isLoading" @click="nextPage()" class="iconfont">&#xe634;</i>
    <div class="loading" v-if="isLoading"><i class="iconfont">&#xe684;</i></div>
   </div>
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
	font-size: 40px;
  cursor: pointer;
}
.loading {
    -webkit-animation: loading 1s infinite linear;
    -moz-animation: loading 1s infinite linear;
    -o-animation: loading 1s infinite linear;
    animation: loading 1s infinite linear;
}
@-webkit-keyframes loading {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-moz-keyframes loading {
    from {
        -moz-transform: rotate(0deg);
    }
    to {
        -moz-transform: rotate(360deg);
    }
}
@-o-keyframes loading {
    from {
        -o-transform: rotate(0deg);
    }
    to {
        -o-transform: rotate(360deg);
    }
}
@keyframes loading {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>


