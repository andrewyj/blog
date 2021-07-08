<template>
  <div>
    <bl-search></bl-search>
    <bl-navigation></bl-navigation>
    <bl-introduction></bl-introduction>
    <router-view />
    <bl-footer></bl-footer>
  </div>
</template>

<script>
import Navigation from "./components/navigation"
import Search from "./components/search"
import Introduction from "./components/introduction"
import Footer from "./components/footer"
export default {
  name: "Index",
  components: {
    "bl-navigation": Navigation,
    "bl-search": Search,
    "bl-introduction": Introduction,
    "bl-footer": Footer,
  }
};
</script>

<style>
@import "https://unpkg.com/aos@2.3.1/dist/aos.css";
</style>
