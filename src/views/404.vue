<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="bullshit">
        <div class="bullshit__oops">404 | Not Found</div>
        <!-- <div class="bullshit__headline"></div> -->
        <div class="bullshit__info">The page you are looking for is not found.</div>
        <a href="" class="bullshit__return-home">Back to home</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/variables.scss";
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  padding: 0 50px;
  overflow: hidden;
  .bullshit {
    position: relative;
    text-align: center;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: $color-black;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 18px;
      line-height: 21px;
      color: $color-gray;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      padding: 8px;
      width: 110px;
      height: 36px;
      background: $color-light-gray;
      border-radius: 100px;
      text-align: center;
      color: $color-gray;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
