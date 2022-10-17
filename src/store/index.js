import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peoples: [],
    sortPeople: []
  },
  actions: {
    getPeoples({ commit }) {
      const localPeoples = localStorage.getItem('peoples')
      const peoples = localPeoples ? JSON.parse(localPeoples) : []
      commit('setPeoples', peoples)
    },
    addPeople({ commit }, data) {
      const localPeoples = localStorage.getItem('peoples')
      const peoples = localPeoples ? JSON.parse(localPeoples) : []
      peoples.push(data)

      localStorage.setItem('peoples', JSON.stringify(peoples))
      commit("setPeoples", peoples)
    }
  },
  mutations: {
    setPeoples(state, data) {
      state.peoples = data
    },
    async sortPeoples(state, typeSort) {
      const sortArray = (a, b) => {
        if (a[typeSort.field] < b[typeSort.field]) {return -1;}
        if (a[typeSort.field] > b[typeSort.field]) {return 1;}
        return 0;
      }
      const sortArrayRevert = (b,a) => {
        if (a[typeSort.field] < b[typeSort.field]) {return -1;}
        if (a[typeSort.field] > b[typeSort.field]) {return 1;}
        return 0;
      }
      state.peoples = typeSort.direction ? state.peoples.sort(sortArray) : state.peoples.sort(sortArrayRevert)

    },
    setSortPeople(state, data) {
      state.sortPeople = data
    }
  },
  getters: {
    returnPeoples(state) {
      return state.peoples
    },
    returnNewPeoples(state) {
      const reloadPeoples = (id) => {
        let childrenPeoples = state.peoples.filter(people => people.parent === id)
        childrenPeoples.forEach(children => {
          children.children = reloadPeoples(children.id)
        })
        return childrenPeoples
      }

      let parents = state.peoples.filter(people => people.parent === -1)
      parents.forEach(parent => {
        parent.children = reloadPeoples(parent.id)
      })

      return parents
    }
  },
})
