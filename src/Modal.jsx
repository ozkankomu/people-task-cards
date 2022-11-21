import React, { useState } from "react";

const Modal = ({ form, setForm, todos, setTodos, id }) => {
  const newtodos = [];

  const handleModal = (id) => {
    todos.map((item) => {
      if (item.id === id) {
        newtodos.push({ ...item, title: form.title });
      } else {
        newtodos.push(item);
      }
      setTodos(newtodos);
    });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header row justify-content-center">
              <img
                src={`https://i.pravatar.cc/500?img=${id}`}
                className="card-img-top rounded-circle modalImage col-5 mb-2"
                alt="image"
              />

              <h1 className="modal-title fs-5 col-6 " id="exampleModalLabel">
                Edit Task
              </h1>

              <input
                className="form-control  col-12"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleModal(form.id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
