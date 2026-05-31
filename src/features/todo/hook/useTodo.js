import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoApi from "../services/apiTodo";
import { useConfirm } from "../../../shared/contextapi/Confirmcontext ";

const FILTER_LIST = ["All", "Pending", "Finish"];
const STATUS_LIST = ["Pending", "Finish"];

export default function useTodo() {

  const { confirm } = useConfirm(); // ini context api berupa state global

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [todoList, setTodoList] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const debounceRef = useRef(null);

  // untuk load diawal dan setelah create update delete
  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const todos = await TodoApi.getAll(selectedFilter, search, page);
      setTodoList(todos);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // load dengan nilai baru langsung (untuk search/filter/pagination)
  const fetchTodos = async (filter, keyword, currentPage) => {
    try {
      setIsLoading(true);
      const todos = await TodoApi.getAll(filter, keyword, currentPage);
      setTodoList(todos);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);


  const createTodo = async () => {
    const ok = await confirm("Yakin ingin membuat todo ini?");
    if (!ok){
        return;
    };

    try {
      setIsLoading(true);
      await TodoApi.create({
        id: uuidv4(),
        title: title.trim(),
        description: description.trim(),
        status: "Pending",
        created_date: new Date().toISOString(),
      });
      await loadTodos();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id) => {
    const ok = await confirm("Yakin ingin mengubah todo ini?");
    if (!ok){
        return;
    };

    try {
      setIsLoading(true);
    
      const existing = await TodoApi.getById(id);
      await TodoApi.update(id, {
        ...existing,
        title: title.trim(),
        description: description.trim(),
        status: selectedStatus,
      });// merge 2 object, jika var sama maka yg dipakai yg kiri

      await loadTodos();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const finishTodo = async (todo) => {
    try {
      setIsLoading(true);
      await TodoApi.update(todo.id, { ...todo, status: "Finish" });
      await loadTodos();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (todo) => {
    
    const ok = await confirm("Yakin ingin menghapus todo ini?");
    if (!ok){
        return;
    };

    try {
      setIsLoading(true);
      await TodoApi.delete(todo.id);
      await loadTodos();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // search

  const handleSearch = (keyword) => {
    setSearch(keyword);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchTodos(selectedFilter, keyword, 1);
    }, 500);
  };

  // filter

  const changeFilter = (filter) => {
    setSelectedFilter(filter);
    setPage(1);
    fetchTodos(filter, search, 1);
  };

  // button pagination

  const nextPage = () => {
    const next = page + 1;
    setPage(next);
    fetchTodos(selectedFilter, search, next);
  };

  const previousPage = () => {
    if (page <= 1) return;
    const prev = page - 1;
    setPage(prev);
    fetchTodos(selectedFilter, search, prev);
  };

  // set todo (for update)


  return {
    // state
    isLoading,
    page,
    selectedFilter,
    todoList,
    filterList: FILTER_LIST,
    statusList: STATUS_LIST,
    selectedStatus,
    setSelectedStatus,
    title,
    setTitle,
    description,
    setDescription,
    search,

    // actions
    createTodo,
    updateTodo,
    finishTodo,
    deleteTodo,
    handleSearch,
    changeFilter,
    nextPage,
    previousPage,
  };
}