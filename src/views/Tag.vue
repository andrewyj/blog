<template>
  <div class="container">
      <h1 class="post-title">标签</h1>
      <div class="posts-list">
        <div class="post">
          <div class="tags">
            <router-link :style="getTagStyle(item.count)" :to="'/?tag_id='+item.id" class="tag" 
            v-for="item in tags" 
            v-bind:key="item.id">{{item.name}}</router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { fetchTags } from '@/api/tag'
export default {
  name: "Tag",
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.$isLoading(true)
    let vm = this
    fetchTags().then(response => {
      this.$isLoading(false)
      this.tags = response.data
    }).catch(function() {
      vm.$isLoading(false)
    })
  },
  methods: {
    getTagStyle(count) {
      let rgb = 150
      let fontSize = 15
      count = count > 15 ? 15 : count
      rgb -= count*10
      fontSize += count

      return {
        'color': 'rgb('+rgb+','+rgb+','+rgb+''+')',
        'font-size': fontSize+'px',
        'margin': '5px'
      }
    }
  }
}
</script>
