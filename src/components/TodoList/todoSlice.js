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
import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "learn react", completed: false, priority: "Medium" },
    { id: 2, name: "learn nextjs", completed: true, priority: "High" },
    { id: 3, name: "learn nodejs", completed: false, priority: "Low" },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload)
      if (currentTodo) currentTodo.completed = !currentTodo.completed
    },
  },
})
