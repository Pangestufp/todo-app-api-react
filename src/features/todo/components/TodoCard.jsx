import Button from "../../../shared/ui/Button";

export default function TodoCard({
  todo,
  onEdit,
  onFinish,
  onDelete,
}) {
  return (
    <div className="border rounded-md p-4">
      <h3 className="font-semibold">
        {todo.title}
      </h3>

      <p className="text-sm text-gray-600">
        {todo.description}
      </p>

      <p className="mt-1 text-sm text-gray-400">
        Dibuat: {new Date(todo.created_date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className="mt-1 text-sm">
        Status: {todo.status}
      </p>

      <div className="flex gap-2 mt-3">
        <Button onClick={() => onEdit(todo)}>
          Edit
        </Button>

        {todo.status !== "Finish" && (
          <Button
            onClick={() => onFinish(todo)}
          >
            Finish
          </Button>
        )}

        <Button
          onClick={() => onDelete(todo)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}