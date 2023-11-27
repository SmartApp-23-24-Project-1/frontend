<template>
  <div class="container-fluid p-0">
    <Spinner/>
    <Header/>
    <div class="row">
      <div class="col-lg-2">
        <Sidebar/>
      </div>
      <div class="col-lg-10">
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
  }
}
</script>

<style>
</style>
