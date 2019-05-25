import Vue from "vue";
import Vuex from "vuex";
import Todo from "./todo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Todo
  }
});
