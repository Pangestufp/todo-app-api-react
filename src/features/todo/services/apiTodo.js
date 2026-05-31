import api from "../../../app/axios";
import Endpoints from "../../../shared/endpoint/endpoint";

const TodoApi = {
  create: async (payload) => {
    const res = await api.post(
      Endpoints.TODO.CREATE,
      payload
    );
    return res;
  },

  update: async (id, payload) => {
    const res = await api.put(
      Endpoints.TODO.UPDATE(id),
      payload
    );
    return res;
  },

  delete: async (id) => {
    const res = await api.delete(
      Endpoints.TODO.DELETE(id)
    );
    return res;
  },
  
  getById: async (id) => {
    const res = await api.get(Endpoints.TODO.GET_BY_ID(id));
    return res.data.data;
  },

  async getAll(status, search, page = 1) {
    const page_size = 5;
    const res = await api.get(Endpoints.TODO.GET_ALL);

    let todos = res.data.data;

    if (status && status !== "All") {
      todos = todos.filter(
        (item) => item.status === status// filter status jika bukan filter bukan all
      );
    }

    if (search?.trim()) {
      todos = todos.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) // searching
      );
    }

    const start = (page - 1) * page_size; //pagination

    return todos.slice(
      start,
      start + page_size
    );
  },

};

export default TodoApi;