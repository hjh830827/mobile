<template>
  <Nuxt />
</template>
<script>
export default {
  components: {},
  // before ssr rendering
  asyncData() {
    return {};
  },
  mounted() {
    console.log('layout mounted');
  }
};
</script>

<style></style>
