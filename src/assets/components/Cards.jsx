import React from 'react';
import Edit from './Edit';

function Cards({ todo, setTodo, onEdit }) {
  const Delete = () => {
    setTodo((prevTodo) => prevTodo.filter((item) => item.id !== todo.id));
  };

  const setTodoStatus = (status) => {
    setTodo((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, status } : t
      )
    );

    const dropdownButton = document.getElementById(`dropdownButton-${todo.id}`);
    if (dropdownButton) {
      dropdownButton.click();
    }
  };

  const getStatusColor = (status) => {
    return status ? 'btn-success' : 'btn-danger';
  };

  return (
    <div className="col">
      <div className="card" style={{ width: '18rem', fontWeight: 500, margin: 10 }}>
        <div className="card-body">
          <h5 className="card-title">Name: {todo.title}</h5>

          <p className="card-text">Description: {todo.description}</p>
          <div className="btn-group">
            Status &nbsp;
            <button
              id={`dropdownButton-${todo.id}`}
              className={`btn btn-secondary btn-sm dropdown-toggle ${getStatusColor(
                todo.status
              )}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {todo.status ? 'Completed' : 'Not Completed'}
            </button>
            <ul className="dropdown-menu">
              <li
                className={`dropdown-item ${getStatusColor(true)}`}
                onClick={() => setTodoStatus(true)}
              >
                Completed
              </li>
              <li
                className={`dropdown-item ${getStatusColor(false)}`}
                onClick={() => setTodoStatus(false)}
              >
                Not Completed
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end w-auto">
          <div>
            <button className="btn btn-success btn-sm w-auto" onClick={onEdit}>
              Edit
            </button>
          </div>
          &nbsp;
          <div>
            <button className="btn btn-danger btn-sm w-auto" onClick={Delete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;