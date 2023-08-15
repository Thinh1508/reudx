// const initState = [
//   { id: 1, name: "learn react", completed: false, priority: "Medium" },
//   { id: 2, name: "learn nextjs", completed: true, priority: "High" },
//   { id: 3, name: "learn nodejs", completed: false, priority: "Low" },
// ]

// const todoListReducer = (state = initState, action) => {
//   // console.log({ state, action })
//   switch (action.type) {
//     case "todoList/addTodo":
//       return [...state, action.payload]

//     case "todoList/toggleTodoStatus":
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       )

//     default:
//       return state
//   }
// }

// export default todoListReducer

// redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const todoSlice = createSlice({
  name: "todoList",
  // initialState: [
  //   { id: 1, name: "learn react", completed: false, priority: "Medium" },
  //   { id: 2, name: "learn nextjs", completed: true, priority: "High" },
  //   { id: 3, name: "learn nodejs", completed: false, priority: "Low" },
  // ],
  initialState: { status: "idle", todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload)
      if (currentTodo) currentTodo.completed = !currentTodo.completed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
        state.status = "idle"
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        let currentTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        )
        if (currentTodo) currentTodo.completed = !currentTodo.completed
      })
  },
})

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("/api/todos")
  const data = await res.json()
  return data.todos
})

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    })
    const data = await res.json()
    return data.todos
  }
)

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updateTodo) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(updateTodo),
    })
    const data = await res.json()
    console.log({ data })
    return data.todos
  }
)

export default todoSlice
