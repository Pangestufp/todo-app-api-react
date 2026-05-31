import { useNavigate } from "react-router-dom";
import useTodo from "../hook/useTodo";
import Button from "../../../shared/ui/Button";
import TextField from "../../../shared/ui/TextField";
import Dropdown from "../../../shared/ui/Dropdown";
import TodoCard from "../components/TodoCard";

export default function TodoPage() {
  const navigate = useNavigate();
  const todo = useTodo();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Todo List
      </h1>

      <div className="flex gap-2 mb-4">
        <TextField
          placeholder="Search..."
          value={todo.search}
          onChange={(e) => todo.handleSearch(e.target.value)}
        />

        <Dropdown
          value={todo.selectedFilter}
          onChange={todo.changeFilter}
          options={todo.filterList}
        />

        <Button
          onClick={() => navigate(`/form`)}
        >
          Add
        </Button>
      </div>

      {todo.isLoading ? (
        <p>Loading...</p>
      ) : todo.todoList.length === 0 ? (
        <p>Tidak ada data todo</p>
      ) : (
        <div className="flex flex-col gap-3">
          {todo.todoList.map((item) => (
            <TodoCard
              key={item.id}
              todo={item}
              onEdit={(t) =>
                navigate(`/form/${t.id}`)
              }
              onFinish={todo.finishTodo}
              onDelete={todo.deleteTodo}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-4">
        <Button
          disabled={todo.page <= 1}
          onClick={todo.previousPage}
        >
          Prev
        </Button>

        <span>Page {todo.page}</span>

        <Button onClick={todo.nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}