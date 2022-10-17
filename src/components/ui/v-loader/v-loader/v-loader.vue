<template>
  <div class="loader">
    <div class="loader__item" v-for="i in 10" :key="i"/>
  </div>
</template>
<script>
export default {
  name: 'v-loader'
}
</script>
<style lang="scss" src="./v-loader.scss" scoped />