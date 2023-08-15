import { createSelector } from "@reduxjs/toolkit"

export const searchSelector = (state) => state.filters.search
export const statusSelector = (state) => state.filters.status
export const prioritySelector = (state) => state.filters.priority
export const todoListSelector = (state) => state.todoList.todos

// export const todoListSelector = (state) => {
//   const searchText = searchSelector()

//   const todoRemaining = state.todoList.filter((todo) => {
//     return todo.name.includes(searchText)
//   })
//   return todoRemaining
// }

// reselect

export const todoRemainingSelector = createSelector(
  todoListSelector,
  prioritySelector,
  statusSelector,
  searchSelector,
  (todoList, priority, status, searchText) => {
    return todoList.filter((todo) => {
      if (status === "All")
        return priority.length
          ? todo.name.includes(searchText) && priority.includes(todo.priority)
          : todo.name.includes(searchText)
      return (
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priority.length ? priority.includes(todo.priority) : true)
      )
    })
  }
)
