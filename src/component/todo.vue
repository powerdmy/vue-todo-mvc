<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing}">
    <div class="view">
        <input class="toggle"
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo({ todo })"
            >
        <label v-text="todo.text" @dblclick="editing = true"></label>
        <button class="destroy" @click="deleteTodo({ todo })"></button>
        </div>
        <input class="edit"
        :value="todo.text"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus="editing"
        v-show="editing">
  </li>
</template>
<script>
import { mapMutations } from "vuex"
export default {
    name: "todo",
    props: {
        todo: {
            type: Object
        }
    },
    directives: {
        focus (el, { value }, { context }) {
        if (value) {
            context.$nextTick(() => {
                el.focus()
            })
        }
        }
    },
    data() {
        return {
            editing: false
        }
    },
    methods: {
        ...mapMutations([
            'deleteTodo',
            'toggleTodo',
            'editTodo'
        ]),
        doneEdit(e) {
            let editVal = e.target.value.trim()
            let todo = this.todo
            if(!editVal){
                this.deleteTodo({ todo })
            }
            else if(this.editing){
                this.editTodo({
                    todo,
                    editVal
                })
                this.editing = false
            }
        },
        cancelEdit(){
            this.editing = false
        }
    }
}
</script>

