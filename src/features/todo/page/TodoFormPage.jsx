import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodo from "../hook/useTodo";
import TodoApi from "../services/apiTodo";
import Button from "../../../shared/ui/Button";
import TextField from "../../../shared/ui/TextField";
import Dropdown from "../../../shared/ui/Dropdown";

export default function TodoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreate = !id;

  const todo = useTodo();

  useEffect(() => {// jika id ada, maka set
    if (!isCreate) {
      TodoApi.getById(id).then((data) => {
        todo.setTitle(data.title);
        todo.setDescription(data.description);
        todo.setSelectedStatus(data.status);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreate) {
      await todo.createTodo();
    } else {
      await todo.updateTodo(id);
    }
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isCreate ? "Create Todo" : "Edit Todo"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextField
          placeholder="Title"
          value={todo.title}
          onChange={(e) => todo.setTitle(e.target.value)}
        />

        <textarea
          rows={4}
          placeholder="Description"
          value={todo.description}
          onChange={(e) => todo.setDescription(e.target.value)}
          className="border border-blue-500 rounded-md p-2"
          required
        />

        {!isCreate && (
          <Dropdown
            value={todo.selectedStatus}
            onChange={todo.setSelectedStatus}
            options={todo.statusList}
          />
        )}

        <div className="flex gap-2">
          <Button type="submit" loading={todo.isLoading}>
            {isCreate ? "Create" : "Update"}
          </Button>

          <Button type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
