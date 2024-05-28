import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import Edit from './Edit';

function TopBar({ todo, setTodo, completed, setCompleted }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filteredTodo, setFilteredTodo] = useState([]);

  useEffect(() => {
    if (completed === 'All') {
      setFilteredTodo(todo);
    } else {
      const filtered = todo.filter((task) =>
        completed === 'Completed' ? task.status : !task.status
      );
      setFilteredTodo(filtered);
    }
  }, [todo, completed]);

  const handleDrop = (selectedStatus) => {
    setCompleted(selectedStatus);
  };

  const getButtonColor = (status) => {
    return status === completed ? 'btn-success' : 'btn-danger';
  };

  const handleClick = () => {
    if (selectedTodo) {
      setTodo((prevTodos) =>
        prevTodos.map((t) =>
          t.id === selectedTodo.id ? { ...t, title, description } : t
        )
      );
      setSelectedTodo(null);
    } else {
      const id = todo.length ? todo[todo.length - 1].id + 1 : 1;
      const newArray = [
        ...todo,
        { id, title, description, status: completed === 'Completed' },
      ];
      setTodo(newArray);
    }

    setTitle('');
    setDescription('');
    setCompleted('All');
  };

  const defaultStatus = 'All';

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <h1 className="text-center HeaderColor">My Todo</h1>
      <div className="container overflow-hidden text-center">
        <div className="row gx-5">
          <div className="col">
            <div className="p-3">
              <input
                placeholder="Name"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <input
                placeholder="Todo Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <button onClick={handleClick}>Add todo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5">
        <div>
          <h6 className="fw-bold content">My Todo's</h6>
        </div>
        <div>
          <h4 className="fw-bold">
            Status Filter :{' '}
            <span>
              {' '}
              <div className="btn-group" onClick={handleDropdownClick}>
        <button
          className={`btn btn-sm dropdown-toggle ${getButtonColor(defaultStatus)}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {completed}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="btn btn-sm" onClick={() => handleDrop(defaultStatus)}>
              {defaultStatus}
            </button>
          </li>
          <li>
            <button className="btn btn-sm" onClick={() => handleDrop('Completed')}>
              Completed
            </button>
          </li>
          <li>
            <button className="btn btn-sm" onClick={() => handleDrop('Not Completed')}>
              Not Completed
            </button>
          </li>
        </ul>
      </div>
            </span>
          </h4>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {filteredTodo.map((e, i) => (
            <Cards
              key={i}
              completed={completed}
              setCompleted={setCompleted}
              todo={e}
              setTodo={setTodo}
              onEdit={() => {
                setSelectedTodo(e);
                setTitle(e.title);
                setDescription(e.description);
              }}
            />
          ))}
        </div>
      </div>
      {selectedTodo && (
        <Edit
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onClick={handleClick}
        />
      )}
    </>
  );
}

export default TopBar;