<template>
  <div class="home-page">

    <v-button class="home-page__button" text="Добавить" @click="openModal"/>
    <v-loader v-if="isLoad" />
    <template v-else>
      <div class="home-page__table">
        <div class="home-page__table-line" />
        <div class="home-page__header">
          <p @click="sorted('name')">Имя</p>
          <p @click="sorted('number')">Телефон</p>
        </div>
        <people v-for="people in returnNewPeoples" :key="people.id" :people-list="people" />
      </div>
    </template>
    <teleport v-if="isOpenModal" to="body">
      <modal class="home-page__modal" @closeModal="closeModal"/>
    </teleport>
  </div>
</template>
<script>
import VButton from "@/components/ui/v-button/v-button";
import VLoader from "@/components/ui/v-loader/v-loader/v-loader";
import Modal from "@/components/modal/modal";
import teleport from 'vue2-teleport'
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: 'home-page',
  components: { Modal, VLoader, VButton, teleport },
  data: () => ({
    isOpenModal: false,
    isLoad: true,
    sort: {
      field: '',
      direction: false
    }
  }),
  async mounted() {
    await Promise.all([this.getPeoples()])
    this.isLoad = false
  },
  methods: {
    ...mapActions(['getPeoples']),
    ...mapMutations(['sortPeoples']),
    openModal() {
      this.isOpenModal = true
    },
    closeModal() {
      this.isOpenModal = false
    },
    sorted(field) {
      if(field === this.sort.field) this.sort.direction = !this.sort.direction
      else this.sort.direction = false
      this.sort.field = field;
      this.sortPeoples(this.sort)

    }
  },
  computed: {
    ...mapGetters(['returnNewPeoples'])
  }
}
</script>
<style lang="scss" scoped src="./home-page.scss"/>