<template>
  <div class="container-fluid mycontainer">
    <Spinner />
    <div class="darkmode">
      <button class="btn btn-primary" @click="toggleDarkMode">
        <i class="bi bi-brightness-high-fill"></i>
      </button>
    </div>
    <Header />
    <div class="row gy-2" style="padding-bottom: 100px;">
      <div class="col-2 col-md-3 col-xl-2">
        <Sidebar />
      </div>
      <div class="col-12 col-md-9 col-xl-10 p-0">
        <router-view :key="$route.path" />
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

      this.$store.commit('toggleDarkMode')

      
    }
  }
}
</script>

<style>
:root {
  --bg-color: #f4f5f7;
  --primary-color: #1a3eb0;
  --second-color: #fff;
  --fg-color: #484848;
  --hover-color: #fff;
  --shadow-color: #e1e1e1;
  --topbar-text: #888;
  --text-placeholder: #aaa;
  --border-color: #ccc;
}

:root.dark {
  --bg-color: #232323;
  --primary-color: #1a3eb0;
  --second-color: #373737;
  --fg-color: #efefef;
  --hover-color: #333;
  --shadow-color: #3c3c3c;
  --topbar-text: #ccc;
  --text-placeholder: #777;
  --border-color: #777;
}

html {
  background-color: var(--bg-color);
}

.mycontainer,
.sidebar,
.container-fluid {
  background-color: var(--bg-color);
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

.darkmode button i.bi {
  color: #fff;
  font-size: 20px;
}

h1.title {
  color: var(--fg-color);
}

@media screen and (max-width: 770px) {
  h1.title {
    margin-top: 40px;
  }

  .darkmode {
    bottom: 90px;
  }
}

i.bi {
  color: var(--fg-color);
}

.darkmode:hover {
  color: #fff !important;
  background-color: var(--primary-color) !important;
  border-radius: 8px;
}

.form-label {
  color: var(--fg-color);
}

.form-control, .form-control:focus, .form-select {
  background: var(--second-color) !important;
  border-color: var(--border-color) !important;
  color: var(--fg-color) !important;
}

</style>
