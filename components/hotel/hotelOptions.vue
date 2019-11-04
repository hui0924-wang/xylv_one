<template>
  <div class="hotel_options"></div>
</template>

<script>
export default {
  props: {
    cityData: {
      type: Object,
      default: {}
    }
  },

  watch: {
    cityData(newV, oldV) {
      console.log(newV);
    }
  }
};
</script>

<style>
</style>