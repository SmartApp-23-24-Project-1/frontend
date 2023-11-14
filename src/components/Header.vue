<template>
  <div class="container-fluid">
    <div class="row navbar">
      <div class="col-lg-2 text-center navbar-brand-wrapper">
        <!-- TODO: ROUTER-LINK SOSTITUISCE IL TAG <a> -->
        <router-link class="navbar-brand brand-logo" to="/">
          <img src="/images/logo.png" alt="logo"/>
        </router-link>
      </div>
      <div class="col-lg-8">
        <div class="navbar-menu-wrapper">
          <ul class="navbar-nav">
            <li class="nav-item">
              <h1 class="navbar-nav nav-item welcome-text" v-if="this.$route.name === 'Home'">
                Welcome, this is your performance summary today.
              </h1>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-2 user-switch">
        <div class="dropdown d-flex justify-content-end">
          <button class="primary-btn dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-fill user-switch__icon" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg> 
            {{ currentUser }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="(user, index) in users" :key="index">
              <router-link to="" class="dropdown-item" @click="switchUser($event)">{{ user }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      currentUser: "Maurizio",
      users: ["KPI Maintainer2", "KPI Maintainer3"]
    };
  },
  methods: {
    switchUser(event) {
      const linkText = event.target.textContent.trim();
      const fakeUsers = ["Maurizio", "KPI Maintainer2", "KPI Maintainer3"];

      this.users = fakeUsers.filter(user => user != linkText);

      this.currentUser = linkText;
    }
  }
}
</script>

<style scoped>
.user-switch__icon {
  fill: #eee;
  width: 25px;
  vertical-align: middle;
  display: inline-block;
  /* non mi veniva un modo migliore per allineare un svg */
  transform: translate(-3px, -1.5px); 
}

.dropdown .dropdown-toggle::after {
  display: none;
}

</style>