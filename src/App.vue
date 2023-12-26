<template>
  <div class="container-fluid p-0">
    <Spinner/>
    <Header/>
    <div class="row">
      <div class="col-2 col-md-3 col-xl-2">
        <Sidebar/>
      </div>
      <div class="col-12 col-md-9 col-xl-10 p-0">
        <router-view :key="$route.path"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Spinner from './components/Spinner.vue'


export default {
  name: 'App',
  components: {
    Header, Sidebar, Spinner
  },
}
</script>

<style>
html {
  background-color: #f4f5f7;
}
</style>
