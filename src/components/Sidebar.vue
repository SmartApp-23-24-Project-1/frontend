<template>
  <nav class="sidebar mt-3 ms-2" id="sidebar">
        <router-link to="/" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'Home'}">
          <i class="bi bi-house-fill"></i>
          <span class="menu-title"> Overview </span>
        </router-link>
        <router-link to="/analytics" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'Analytics'}">
          <i class="bi bi-graph-up-arrow"></i>
          <span class="menu-title"> Analytics </span>
        </router-link>
        <router-link to="/library" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'KbSource' || this.$route.name === 'InfoKpi'}">
          <i class="bi bi-database-fill"></i>
          <span class="menu-title"> Library </span>
        </router-link>
        <router-link to="/add-a-kpi" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'AddKpi'}">
          <i class="bi bi-plus"></i>
          <span class="menu-title"> Add a KPI </span>
        </router-link>
        <router-link to="/documentation" class="menu-link" href="index.html" v-bind:class="{'active-icon' : this.$route.name === 'KbDocs'}">
          <i class="bi bi-book-half"></i>
          <span class="menu-title"> Docs </span>
        </router-link>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
}
</script>

<style scoped>
i.bi {
  font-size: 25px;
}

.menu-link {
  display: flex;
  text-decoration: none;
  padding: 10px 20px;
  align-items: center;
  column-gap: 15px;
  border-radius: 8px;
}

.menu-title {
  color: var(--fg-color);
  font-weight: 400;
}

.active-icon {
  background-color: white;
  border-radius: 8px;
}

.active-icon .menu-title {
  font-weight: 600;
  color: var(--primary-color);
}

.active-icon i.bi {
  color: var(--primary-color);
}
.menu-link:hover {
  background-color: var(--hover-color);
}

a.active-icon:hover {
  background-color: #fff;
}

@media screen and (max-width: 770px) {
  .sidebar { 
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      display: flex;
      z-index: 100;
      justify-content: center;
  }

  .menu-link {
      flex: 1 1 70px;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
  }

  .menu-title {
      display: block;
      font-size: 13px;
  }
}

@media screen and (max-width: 450px) {

  .menu-link {
      padding: 10px 5px;
  }

  .menu-link i.bi {
    font-size: 22px;
  }

  .menu-title {
      font-size: 11px;
  }
}

</style>