import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal.jsx";

const Detail = () => {
  const { id } = useParams();
  // const urlTodo = "https://jsonplaceholder.typicode.com/todos";
  const [person, setPerson] = useState([]);
  const [msg, setMsg] = useState("Veri Bulunamadı");
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    completed: "",
    id: "",
    title: "",
    userId: "",
  });

  const getPerson = async () => {
    const urlPeople = `https://jsonplaceholder.typicode.com/users/${id}`;
    const { data } = await axios(urlPeople);

    setPerson(data);
  };
  const getTodos = async () => {
    const urlTodo = `https://jsonplaceholder.typicode.com/users/${id}/todos`;
    const { data } = await axios(urlTodo);
    setTodos(data);
  };

  const handleCompleted = (id, completed) => {
    const newTodos = [];
    todos.map((item) => {
      if (item.id == id) {
        return newTodos.push({ ...item, completed: !completed });
      } else {
        return newTodos.push(item);
      }
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const deletedTodos = todos.filter((item) => item.id !== id);
    setTodos(deletedTodos);
  };

  const handleEdit = (item) => {
    setForm({
      completed: item.completed,
      id: item.id,
      title: item.title,
      userId: item.userId,
    });
  };

  // const handleSearch = () => {
  //   const filteredTodos = todos.filter((item) => item.title.includes(search));
  //   filteredTodos.length > 0 ? setFiltered(filteredTodos) : setFiltered(todos);
  // };

  useEffect(() => {
    getPerson();
    getTodos();
  }, []);

  setTimeout(() => {
    setMsg("");
  }, 5000);

  return (
    <div className="container-fluid ">
      <div
        className=" row  container-fluid text-center align-items-center justify-content-center "
        style={{ width: "100%" }}
      >
        <div
          key={person?.id}
          className="card col-4 text-center p-1 "
          style={{ width: "12rem" }}
        >
          <img
            src={`https://i.pravatar.cc/500?img=${person?.id}`}
            className="card-img-top rounded-circle "
            alt="image"
          />
          <div className="card-body">
            <h5 className="card-title">{person?.name}</h5>

            <p className="card-text">{person?.email}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center m-2">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Please search any Task"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-danger mx-2"
            // onClick={handleSearch}
          >
            Search for Task
          </button>
        </div>

        <table className="table ">
          <thead>
            <tr>
              <th scope="col">userID</th>
              <th scope="col">ID</th>
              <th scope="col">Tasks</th>
              <th scope="col">Edit</th>
              <th scope="col">Completed</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          {todos
            .filter((item) => item.title.indexOf(search) !== -1)
            .map((item) => {
              console.log(Array.from(item.title).length);
              return (
                <>
                  {!item && <p>{msg}</p>}
                  <tbody key={item.id}>
                    <tr className="tableTr">
                      <th scope="row">{item?.userId}</th>
                      <th scope="row">{item?.id}</th>
                      <td
                        className={item.completed && "completed"}
                        onClick={() => handleCompleted(item.id, item.completed)}
                      >
                        {item?.title}
                      </td>
                      <td>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="btn p-1 btn-outline-primary rounded-3"
                          style={{ width: "7rem" }}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleCompleted(item.id, item.completed)
                          }
                          className="btn p-1 btn-outline-primary rounded-3"
                          style={{ width: "7rem" }}
                        >
                          Completed
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn p-1 btn-outline-danger rounded-3"
                          style={{ width: "7rem" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <Modal
                      form={form}
                      setForm={setForm}
                      todos={todos}
                      setTodos={setTodos}
                      id={person.id}
                    />
                  </tbody>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Detail;
