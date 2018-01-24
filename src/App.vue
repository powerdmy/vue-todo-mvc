<template>
  <div id="app">
    <section class="todoapp" v-cloak>
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?"
               @keyup.enter="addTodo">
			</header>
      <!-- main section -->
      <section class="main" v-show="todos.length">
        <input class="toggle-all" type="checkbox" :checked="allCheck" @change="toggleAll({done: !allCheck})" id="toggle-all">
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <todo v-for="(todo, index) in filterArray" :key="index" :todo="todo"></todo>
        </ul>
      </section>
      <!-- footer -->
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainNum }}</strong>
          {{ remainNum | addS('item') }} left
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters" :key="key">
            <a :href="'#/'+key" @click="curFilter = key" :class="{selected: curFilter == key}">{{ key | capitalize }}</a>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted" v-show="completeNum">
          Clear completed
        </button>
      </footer>
		</section>
  </div>
</template>

<script>
import todo from './component/todo.vue';
import { mapMutations } from 'vuex';

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: 'app',
  components: {
    todo
  },
  data () {
    return {
      allcheck: false,
      filters,
      curFilter: 'all'
    }
  },
  computed:{
    todos() {
      return this.$store.state.todos
    },
    allCheck() {
      return this.todos.every(todo => todo.done)
    },
    filterArray(){
      return filters[this.curFilter](this.todos)
    },
    remainNum(){
      return filters['active'](this.todos).length
    },
    completeNum(){
      return filters['completed'](this.todos).length
    }
  },
  methods: {
    addTodo(e){
      let text = e.target.value
      if(text.trim() != ''){
        this.$store.commit('addTodo',{
          text
        })
        e.target.value = ''
      }
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters:{
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
    addS: (n, s) => n <= 1? s : s+'s'
  }
}
</script>
