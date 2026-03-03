import React, { useState } from "react";
import { Slide, toast } from "react-toastify";
import TaskModal from "./TaskModal";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/features/todoSlice";

const TaskItem = ({
  task,
  handleToggle,
  onDelete,
  editingTaskId,
  setEditingTaskId,
  isList,
}) => {
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    details: "",
  };

  const [editData, setEditData] = useState(initialState);
  const [error, setError] = useState(initialState);

  const validationField = {
    title: {
      required: true,
    },
    details: {
      required: true,
    },
  };

  function handleForm(e) {
    const updateForm = {
      ...editData,
      [e.target.name]: e.target.value,
    };
    setEditData(updateForm);

    const fieldError = validate(updateForm)[e.target.name];

    if (fieldError) {
      setError({
        ...error,
        [e.target.name]: fieldError,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: "",
      });
    }
  }

  function validate(data) {
    let newError = {};
    Object.keys(validationField).forEach((field) => {
      const rules = validationField[field];
      const value = data[field];

      if (rules.required && !value.trim()) {
        newError[field] = "This field is required";
        return;
      }
    });
    return newError;
  }

  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  const isEditable = editingTaskId === task.id;

  function onEdit(task) {
    console.log(task);

    const validateErrors = validate(editData);
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }

    dispatch(editTask({ ...task, ...editData }));

    setEditingTaskId(null);
    toast.success("Task Edited!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

    setEditShowModal(false);
  }

  function onCancel() {
    setEditingTaskId(null);
    setEditData({
      title: task.title,
      details: task.details,
    });
    setEditShowModal(false);
    setError(initialState)
  }

  return (
    <div
      className={`${task.completed ? `bg-green-700` : `bg-gray-400`} flex flex-col justify-between gap-3 text-white rounded-xl p-3  transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-lg hover:shadow-gray-500 ${isList ? "w-[70vw] h-[8vh] flex-row items-center" : "h-50 w-88"}`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-black font-medium wrap-break-word line-clamp-1">
          {task.title}
        </h2>
        {!isList && (
          <p className="font-light w-full wrap-break-word line-clamp-3">
            {task.details}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleToggle(task)}
          className="bg-green-500 px-3 py-2 rounded-xl hover:bg-green-300 transition-colors duration-200 cursor-pointer"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingTaskId(task.id);
            setEditData({
              title: task.title,
              details: task.details,
            });
            setEditShowModal(true);
          }}
          className="bg-yellow-500 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors duration-200 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="bg-red-500 px-3 py-2 rounded-xl hover:bg-red-300 transition-colors duration-200 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-950 px-3 py-2 rounded-xl hover:bg-amber-700 transition-colors duration-200 cursor-pointer"
        >
          View
        </button>
      </div>

      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        isCompleted={task.completed}
      >
        {!isEditable && (
          <>
            <div>
              <h2 className="text-2xl wrap-break-word font-bold text-center underline mb-3">
                {task.title}
              </h2>
              <p className="text-white wrap-break-word mb-4">{task.details}</p>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-500 px-3 py-2 rounded-xl hover:bg-green-300 transition-colors duration-200 cursor-pointer text-white"
              >
                Ok
              </button>
            </div>
          </>
        )}
      </TaskModal>

      <EditModal
        showModal={editShowModal}
        onCancel={onCancel}
        isCompleted={task.completed}
      >
        <>
          <h1 className="text-2xl font-bold text-center underline mb-3">
            Edit Task
          </h1>
          <div>
            <div className="w-full mb-1">
              <label className="text-black" htmlFor="title">
                Title <span className="text-sm text-red-500">*</span>
              </label>
              <input
                name="title"
                id="title"
                value={editData.title}
                onClick={(e) => e.stopPropagation()}
                onChange={handleForm}
                className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
              />
              {error.title && (
                <p className="text-red-500 text-sm mt-1">{error.title}</p>
              )}
            </div>

            <div className="w-full mb-3">
              <label className="text-black" htmlFor="details">
                Details <span className="text-sm text-red-500">*</span>
              </label>
              <textarea
                name="details"
                value={editData.details}
                onClick={(e) => e.stopPropagation()}
                onChange={handleForm}
                className="border p-2 w-full h-35 bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl resize-none"
              />
              {error.details && (
                <p className="text-red-500 text-sm">{error.details}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                onEdit(task);
                e.stopPropagation();
              }}
              type="button"
              className="bg-green-500 px-3 py-2 rounded-xl hover:bg-green-300 transition-colors duration-200 cursor-pointer"
            >
              Ok
            </button>
            <button
              onClick={() => {
                onCancel();
              }}
              className="bg-red-500 px-3 py-2 rounded-xl hover:bg-red-300 transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      </EditModal>
    </div>
  );
};

export default TaskItem;
