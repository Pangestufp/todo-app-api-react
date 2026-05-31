import { Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "../../features/todo/page/TodoPage";
import TodoFormPage from "../../features/todo/page/TodoFormPage";

function AppRouter() {// routing ke page mana
  return (
    <Routes>
      <Route path="/home" element={<TodoPage />} />
      <Route path="/form" element={<TodoFormPage />} />
      <Route path="/form/:id" element={<TodoFormPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRouter;