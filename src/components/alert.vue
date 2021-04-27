<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
let seed = 0;
function getUuid() {
  return `alert_${seed++}`;
}
export default {
  data() {
    return {
      notices: []
    };
  },
  methods: {
    message(notice) {
      const uuid = getUuid();
      let _notice = Object.assign({ name: uuid }, notice);
      this.notices.push(_notice);
      const { duration } = _notice; 
      setTimeout(() => {
        this.remove(_notice.name);
      }, duration * 1000);
    },

    remove(name) {
      const notices = this.notices;
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "~@/style/variables.scss";
  .alert {
    position: fixed;
    width: 100%;
    top: 30%;
    left: 0;
    text-align: center;
    pointer-events: none;
    z-index: 1000;
  }
  .alert-content {
    display: inline-block;
    padding: 10px 18px;
    background: $color-gray;
    border-radius: 3px;
    color: $color-white;
    margin-bottom: 10px;
    border-radius: 10px;
  }
</style>