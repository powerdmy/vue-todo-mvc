export const STOREAGE_KEY = 'todo-mvc'

export const state = {
    todos: JSON.parse(window.localStorage.getItem(STOREAGE_KEY) || '[]')
}

export const mutations = {
    // 增加
    addTodo(state , { text }){
        state.todos.push({
            text,
            done: false
        })
    },
    // 删除
    deleteTodo(state, { todo }){
        state.todos.splice(state.todos.indexOf(todo), 1)
    },
    // 全选切换
    toggleAll(state, { done }){
        state.todos.forEach(todo => {
            todo.done = done
        });
    },
    // 单个选择
    toggleTodo(state, { todo }){
        todo.done = !todo.done
    },
    // 编辑
    editTodo(state, { todo, editVal }){
        todo.text = editVal
    },
    //删除已经完成
    clearCompleted(state){
        state.todos = state.todos.filter((todo) => !todo.done)
    }
}