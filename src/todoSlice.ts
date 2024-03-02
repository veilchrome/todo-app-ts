import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number
  text: string
  completed: boolean
  isEditing: boolean
}

const initialState: Todo[] = []

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) =>{
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        isEditing: false,
      }
      state.push(newTodo)
    },

    toggleComplete: (state, action: PayloadAction<number>) =>{
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      } 
    },

    toggleEdit: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.isEditing = !todo.isEditing
      }
    },

    saveEdit: (state, action: PayloadAction<{ id: number; newText: string }>) => {
      const { id, newText } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
        todo.isEditing = false;
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((todo) => todo.id === action.payload)
      if( index !== -1){
        state.splice(index, 1)
      }
    },
  },
})

export const { addTodo, toggleComplete, toggleEdit, saveEdit, deleteTodo} = todoSlice.actions
export default todoSlice.reducer