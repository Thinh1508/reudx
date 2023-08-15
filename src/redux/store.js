// import { createStore } from "redux"
// import rootReducer from "./reducer"
// import { composeWithDevTools } from "redux-devtools-extension"

// const composedEnhancers = composeWithDevTools()

// const store = createStore(rootReducer, composedEnhancers)

// export default store

// react toolkit

import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "../components/TodoList/todoSlice"
import filtersSlice from "../components/Filters/filtersSlice"

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoSlice.reducer,
  },
})

export default store
