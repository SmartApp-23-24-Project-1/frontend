<template>
  <div class="container-fluid">
    <div class="row align-items-center pt-3">
      <div class="col-6 col-lg-2">
        <a class="navbar-brand" href="#">
          <img src="/images/logo.png" alt="logo of website" class="navbar__logo">
        </a>
      </div>

      <div class="col-5 col-md-8 topbar-text">
        <p class="m-0 text-center" v-if="this.$route.name === 'Home'">Welcome, this is your performance summary today.</p>
      </div>

      <div class="col-6 col-lg-2 user-switch">
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
    },
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

.dropdown-toggle {
  background-color: var(--primary-color);
}

.dropdown .dropdown-toggle::after {
  display: none;
}

@media screen and (max-width: 990px) {
  .topbar-text {
    display: none;
  }
}

.topbar-text p {
  font-size: 1.6rem;
  color: var(--topbar-text);
  position: relative;
  left: 20px;
}

.navbar__logo {
  max-width: 180px;
}
</style>