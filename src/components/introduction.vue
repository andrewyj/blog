<template>
  <div id="masthead" class="overlay animated from-bottom" itemprop="brand">
    <div class="site-branding text-center">
      <a>
        <figure>
          <img
            class="custom-logo avatar"
            style="width: 75px; height: 75px"
            src="//cdn.v2ex.com/gravatar/e6d0ff614921f717bd85da18604fa2aes=60&d=identicon&r=G"
          />
        </figure>
      </a>
      <div class="blog-description">
        hahahh
        <!--                <div class="typed-strings" hidden>-->
        <!--                </div>-->
        <!--                <span class="typed"></span>-->
      </div>
    </div>
    <!-- .site-branding -->
  </div>
</template>

<script>
export default {
  name: "Introduction",
};
</script>

<style scoped>
#masthead {
  position: relative;
  z-index: 2;
  display: block;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 260px;
  box-sizing: border-box;
}
.site-branding {
  position: relative;
  display: inline-block;
  z-index: 3;
  padding-top: 110px;
}

.custom-logo {
  display: inline-block;
  width: 100px;
}

.avatar,
.avatar img {
  border-radius: 3px;
}
.blog-description {
  text-transform: none;
  font-weight: 400;
  color: #222223;
  margin-top: 20px;
}
</style>
