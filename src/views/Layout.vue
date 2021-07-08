<template>
  <div>
    <Search />
    <Navigation />
    <Introduction />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navigation from "../components/navigation"
import Search from "../components/search"
import Introduction from "../components/introduction"
import Footer from "../components/footer"
export default {
  name: "Index",
  components: {
    Navigation,
    Search,
    Introduction,
    Footer,
  }
};
</script>

<style>
@import "https://unpkg.com/aos@2.3.1/dist/aos.css";
</style>
