<template>
  <div class="container-fluid p-0 mycontainer">
    <Spinner/>
    <div class="darkmode">
      <button class="btn" @click="toggleDarkMode"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg></button>
      
    </div>

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
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle("dark")
    }
  }
}
</script>

<style>
:root {
  --bg-color: #f4f5f7;
  --primary-color: #1a3eb0;
  --fg-color: #484848;
  --hover-color: #fff;
  --shadow-color: #e1e1e1;
  --topbar-text: #888;
}

html {
  background-color: var(--bg-color);
}

.mycontainer, .sidebar, .container-fluid {
  background-color: var(--bg-color);
}

:root.dark {
  --bg-color: #232323;
  --primary-color: #1a3eb0;
  --fg-color: #efefef;
  --hover-color: #333;
  --shadow-color: #3c3c3c;
  --topbar-text: #ccc;
}

.darkmode {
  position: fixed;
  z-index: 20;
  left: 20px;
  bottom: 20px;
}

.darkmode button {
  background-color: var(--primary-color);
  color: #fff;
}

.darkmode button svg {
  fill: #fff;
}

p.title {
  color: var(--fg-color);
}

</style>
