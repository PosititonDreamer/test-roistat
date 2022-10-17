<template>
  <div class="modal" @click="$emit('closeModal')">
    <div class="modal__content" @click.stop>
      <form class="modal__form" @submit.prevent="newPeople()">
        <v-input v-model="formData.name" :error="errorName" name="Имя" @change="checkData.name = true"/>
        <v-input v-model="formData.number" v-mask="'+7 ### ### ## ##'" :error="errorNumber" name="Телефон"
                 @change="checkData.number = true"/>
        <label class="modal__chief">
          Начальник
          <select v-model="formData.parent" class="modal__select">
            <option value="-1">не выбрано</option>
            <option v-for="people in returnPeoples" :value="people.id">{{people.name}}</option>
          </select>
        </label>

        <v-button :disabled="!activeButton" text="Добавить запись" :loaded="loaded"/>
      </form>
      <button class="modal__close" @click="$emit('closeModal')">закрыть</button>

    </div>
  </div>
</template>
<script>
import VInput from "@/components/ui/v-input/v-input";
import VButton from "@/components/ui/v-button/v-button";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'modal',
  components: { VInput, VButton },
  data: () => ({
    loaded: false,
    formData: {
      name: '',
      number: '',
      parent: -1,
      id: Date.now()
    },
    checkData: {
      name: false,
      number: false
    },
  }),
  computed: {
    ...mapGetters(['returnPeoples']),
    errorName() {
      if (this.checkData.name && this.formData.name.length === 0) return 'Имя не должно быть пустое'
      if (this.checkData.name && this.formData.name.match(/[^a-zA-Zа-яёА-ЯЁ]/g)) return 'Имя должно содержать только буквы'
      return ''
    },
    errorNumber() {
      if (this.checkData.number && this.formData.number.length !== 16) return 'Номер введен не полностью'
      return ''
    },
    activeButton() {
      return this.checkData.name && !this.errorName && !this.errorNumber && this.checkData.number
    }
  },
  methods: {
    ...mapActions(['addPeople']),
    newPeople() {
      this.loaded = true
      let newDate = {
        name: this.formData.name,
        number: this.formData.number,
        parent: this.formData.parent,
        id: this.formData.id
      }
      this.addPeople(newDate)
      alert('запись добавлена')
      this.formData.name = this.formData.number = ''
      this.checkData.name = this.checkData.number = false
      this.formData.id = Date.now()
      this.formData.parent = -1
    }
  }
}
</script>
<style lang="scss" scoped src="./modal.scss"/>