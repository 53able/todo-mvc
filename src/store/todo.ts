const STORAGE_KEY = "todos-vuejs";

export default {
  namespaced: true,
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
  },
  mutations: {
    addTodo(state: any, todo: string) {
      state.todos.push(todo);
    },

    removeTodo(state: any, todo: string) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },

    editTodo(state: any, { todo, text = todo.text, done = todo.done }: any) {
      todo.text = text;
      todo.done = done;
    }
  },
  actions: {
    addTodo({ commit }: any, text: any) {
      commit("addTodo", {
        text,
        done: false
      });
    },

    removeTodo({ commit }: any, todo: any) {
      commit("removeTodo", todo);
    },

    toggleTodo({ commit }: any, todo: any) {
      commit("editTodo", { todo, done: !todo.done });
    },

    editTodo({ commit }: any, { todo, value }: any) {
      commit("editTodo", { todo, text: value });
    },

    toggleAll({ state, commit }: any, done: any) {
      state.todos.forEach((todo: any) => {
        commit("editTodo", { todo, done });
      });
    },

    clearCompleted({ state, commit }: any) {
      state.todos
        .filter((todo: { done: any }) => todo.done)
        .forEach((todo: any) => {
          commit("removeTodo", todo);
        });
    }
  }
};
