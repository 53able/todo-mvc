import { store, types } from "vuelm";

const STORAGE_KEY = "todos-vuejs";

const Type = types("ADD_TODO", "REMOVE_TODO", "EDIT_TODO");

const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
};

const updates = {
  [Type.ADD_TODO](state, todo) {
    console.log("store.add");
    state.todos.push(todo);
    console.log("store.state", state);
    return state;
  },

  [Type.REMOVE_TODO](state, todo) {
    console.log("store.remove");
    console.log(state.todos);
    state.todos.splice(state.todos.indexOf(todo), 1);
    return state;
  },

  [Type.EDIT_TODO](state, { todo, text = todo.text, done = todo.done }) {
    console.log("store.edit");
    todo.text = text;
    todo.done = done;
  }
};

const actions = {
  addTodo(text) {
    console.log("addTodo", state.todos);
    this.update(Type.ADD_TODO, {
      text,
      done: false
    });
  },

  removeTodo(todo) {
    this.update(Type.REMOVE_TODO, todo);
  },

  toggleTodo(todo) {
    this.update(Type.EDIT_TODO, { todo, done: !todo.done });
  },

  editTodo({ todo, value }) {
    this.update(Type.EDIT_TODO, { todo, text: value });
  },

  toggleAll(done) {
    console.log("toggleAll", state.todos);
    state.todos.forEach(todo => {
      this.update(Type.EDIT_TODO, { todo, done });
    });
  },

  clearCompleted() {
    console.log("clearCompleted", state.todos);
    console.log(state.todos);
    state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        this.update(Type.REMOVE_TODO, todo);
      });
  }
};

export default store(state, updates, actions);
