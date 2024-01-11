<template>
  <nav class="sidebar" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'Home'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
          <span class="menu-title"> Overview </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/analytics" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'Analytics'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512">
            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
          </svg>
          <span class="menu-title"> Analytics </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/library" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'KbSource' || this.$route.name === 'InfoKpi' || this.$route.name === 'EditKpi'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 448 512">
            <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>
          </svg>
          <span class="menu-title"> Library </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add-a-kpi" class="menu-link" v-bind:class="{'active-icon' : this.$route.name === 'AddKpi'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
          </svg>
          <span class="menu-title"> Add a KPI </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/documentation" class="menu-link" href="index.html" v-bind:class="{'active-icon' : this.$route.name === 'KbDocs'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 448 512">
            <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
          <span class="menu-title"> Docs </span>
        </router-link>
      </li>
    </ul>
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
      min-height: 75px;
      height: 75px;
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
  .sidebar {
    min-height: 65px;
    height: 65px;
  }

  .menu-link {
      padding: 10px 5px;
  }

  .menu-link i.bi {
    font-size: 21px;
  }

  .menu-title {
      font-size: 10px;
  }
}

.icon {
  width: 20px;
  fill: var(--fg-color);
  margin-right: 10px;
}


.active-icon {
  background-color: white;
  border-radius: 8px;
}

.active-icon .menu-title {
  font-weight: 600;
  color: var(--primary-color);
}

.active-icon svg {
  width: 20px;
  fill: var(--primary-color);
  margin-right: 10px
}

</style>





<!--<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
}
</script>

<style scoped>
.icon {
  width: 20px;
  fill: var(--fg-color);
  margin-right: 10px;
}

.menu-link {
  display: block;
  text-decoration: none;
  padding: 10px 20px;
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

.active-icon svg {
  width: 20px;
  fill: var(--primary-color);
  margin-right: 10px
}

.nav-item:hover {
  background-color: var(--hover-color);
}

.nav-item {

}

</style>-->