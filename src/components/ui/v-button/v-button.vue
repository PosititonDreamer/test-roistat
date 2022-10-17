<template>
  <button class="button" @click="$emit('click')" :disabled="loaded">
    {{ text }}
    <div class="button__loaded" v-if="loaded">
      <span/>
      <span />
      <span />
    </div>
  </button>
</template>
<script>
export default {
  name: 'v-button',
  props: {
    text: {
      type: String,
      required: true
    },
    loaded: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="scss" scoped src="./v-button.scss"/>