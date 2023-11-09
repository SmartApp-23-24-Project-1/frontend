<template>
  <div class="container-fluid">
    <div class="row navbar">
      <div class="col-lg-2 text-center navbar-brand-wrapper">
        <!-- TODO: ROUTER-LINK SOSTITUISCE IL TAG <a> -->
        <router-link class="navbar-brand brand-logo" to="/">
          <img src="/images/logo.png" alt="logo"/>
        </router-link>
      </div>
      <div class="col-lg-10">
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
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header"
}
</script>

<style scoped>

</style>