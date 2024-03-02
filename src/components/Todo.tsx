import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, toggleEdit, saveEdit, deleteTodo } from "../todoSlice";
import { useState } from "react";
import { RootState } from "../store";
import "./TodoStyle.css"

const Todo = () => {
  const [text, setText] = useState<string>("")
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text))
      setText("")
    }
  }

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id))
  }

  const handleToggleEdit = (id: number) => {
    dispatch(toggleEdit(id))
  }

  const handleSaveEdit = (id: number, newText: string ) => {
    dispatch(saveEdit({ id, newText}))
  }

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id))
  }

  return (
    <div className="container-todo">
      <h2>Todo list App</h2>
      <input type="text" value={text} onChange={handleInputChange} />{" "}
      <button onClick={handleAddTodo}> Tambah List </button>{" "}
      <ul>
        {" "}
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none", fontWeight: todo.completed ? "700" : "normal" }}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.text}
                  onBlur={(e) => handleSaveEdit(todo.id, e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo.id, todo.text)}> Save </button>
              </>
            ) : (
              <>
                {todo.text}{" "}
                <button onClick={() => handleToggleEdit(todo.id)}> Edit </button>{" "}
                <button onClick={() => handleToggleComplete(todo.id)}>
                  {" "}
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}{" "}
                </button>{" "}
                <button onClick={() => handleDeleteTodo(todo.id)}> Delete </button>{" "}
              </>
            )}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
};

export default Todo;