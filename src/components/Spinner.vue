<template>
  <div class="preloader" v-if="$store.state.spinner">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Spinner',
  methods: {
    show() {
      this.$store.commit('showSpinner');
    },
    hide() {
      this.$store.commit('hideSpinner');
    }
  },
  data() {
    return {}
  },
  created() {
    this.show();
    // setTimeout(() => this.hide(), 1000);
  }
}
</script>

<style scoped>
.preloader {
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;

  left: -10px;
  width: calc(100% + 10px);
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  border: 8px solid var(--primary-color); /* Light grey */
  border-top: 8px solid #fff; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>