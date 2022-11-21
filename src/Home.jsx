import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const urlPeople = "https://jsonplaceholder.typicode.com/users";
  // const urlTodo = "https://jsonplaceholder.typicode.com/todos";

  const getPeople = async () => {
    const { data } = await axios(urlPeople);
    setDatas(data);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="row bg-dark gap-3 d-flex  justify-content-center align-items-center m-3 ">
      <h1 className="text-center text-light ">People Task Application</h1>
      {datas?.map((item) => {
        return (
          <div
            key={item?.id}
            className="card col-lg-2 p-1   text-center "
            // style={{ width: "18rem" }}
          >
            <img
              src={`https://i.pravatar.cc/500?img=${item.id}`}
              className="card-img-top rounded-circle"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{item?.name}</h5>
              <p className="card-text" style={{ fontSize: "14px" }}>
                {item?.company.bs}
              </p>
              <p className="card-text">{item?.email}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`${item.id}`)}
              >
                View Tasks
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
