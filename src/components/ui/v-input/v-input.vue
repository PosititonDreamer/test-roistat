<template>
  <label :class="classBlock">
    {{name}}
    <input :class="classInput" v-bind="$attrs" @input="$emit('input', $event.target.value)" @change="$emit('change')">
    <span class="input-block__error" v-if="error.length">{{error}}</span>
  </label>
</template>
<script>
export default {
  name: 'v-input',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    classInput() {
      return ['input-block__input',{'input-block__input--error': this.error.length} ]
    },
    classBlock() {
      return ['input-block', {'input-block--error': this.error.length}]
    }
  }
}
</script>
<style lang="scss" scoped src="./v-input.scss"/>