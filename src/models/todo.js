import { store, types } from "vuelm";

const Type = types("ADD_TODO", "REMOVE_TODO", "EDIT_TODO");

const state = {
  todos: []
};

const updates = {
  [Type.ADD_TODO](state, todo) {
    state.todos.push(todo);
    return state;
  },

  [Type.REMOVE_TODO](state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
    return state;
  },

  [Type.EDIT_TODO](state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text;
    todo.done = done;
  }
};

const actions = {
  addTodo(text) {
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
    state.todos.forEach(todo => {
      this.update(Type.EDIT_TODO, { todo, done });
    });
  },

  clearCompleted() {
    state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        this.update(Type.REMOVE_TODO, todo);
      });
  }
};

export default store(state, updates, actions);
