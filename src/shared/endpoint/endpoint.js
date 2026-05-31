class Endpoints {
  static TODO = {
    GET_ALL: "/todos",
    CREATE: "/todos",
    UPDATE: (id) => `/todos/${id}`,
    DELETE: (id) => `/todos/${id}`,
    GET_BY_ID: (id) => `/todos/${id}`,
  };
}

export default Endpoints;