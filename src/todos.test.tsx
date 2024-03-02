import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Todo from "./components/Todo";
import { RootState } from "./store";

// Define the type for your mock store
const mockStore = configureStore<RootState>(); // Specify RootState as the generic type

describe('Todo Component', () => {
  let store: MockStoreEnhanced<RootState>; // Use MockStoreEnhanced<RootState> instead of 'any'

  beforeEach(() => {
    const initialState: RootState = {
      // Define your initial state here if needed
      todos: [
        { id: 1, text: 'Todo 1', completed: false, isEditing: false },
        { id: 2, text: 'Todo 2', completed: true, isEditing: false },
      ],
    };
    store = mockStore(initialState);
  });

  test('renders todos correctly', () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    // Check if todos are rendered correctly
    expect(screen.getByText('Todo 1')).toBeTruthy();
    expect(screen.getByText('Todo 2')).toBeTruthy();
  });

  // Add more tests for other functionality such as adding, editing, toggling completion, and deleting todos
  // Example:
  test('adds a new todo', () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByText('Tambah List');

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(store.getActions()).toContainEqual({ type: 'todos/addTodo', payload: 'New Todo' });
  });

  // Add more tests for other functionality
});
