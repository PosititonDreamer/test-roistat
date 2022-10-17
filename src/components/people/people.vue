<template>
  <div :class="classPeople" @click.stop="isOpen = !isOpen">
    <p>{{ peopleList.name }}</p>
    <p>{{ peopleList.number }}</p>
    <template v-if="isOpen">
      <people v-for="people in peopleList.children" :people-list="people" class="children" :key="people.id"/>
    </template>
  </div>
</template>
<script>
export default {
  name: 'people',
  inheritAttrs: false,
  props: {
    peopleList: {
      type: Object,
      required: true
    },

  },
  data: () => ({
    isOpen: false
  }),
  computed: {
    classPeople() {
      return ['people', { 'people--parent': this.peopleList.children.length !== 0 }, { 'people--open': this.peopleList.children.length !== 0 && this.isOpen }]
    }
  }
}
</script>
<style lang="scss" scoped src="./people.scss"/>