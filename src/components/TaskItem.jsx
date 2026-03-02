import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import TaskModal from "./TaskModal";
import EditModal from "./EditModal";

const TaskItem = ({
  task,
  handleToggle,
  onDelete,
  tasks,
  setTasks,
  editingTaskId,
  setEditingTaskId,
  isList,
}) => {
  const [editData, setEditData] = useState({
    title: task.title,
    details: task.details
  }); 
  

  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  const isEditable = editingTaskId === task.id;

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


  function onEdit(task) {
    console.log(task);
    
    if (!(editData.title.trim() && editData.details.trim())) {
      toast.error("Field can't be empty!", {
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
      return;
    }

    let temp = tasks.map((val) => {
      return val.id === task.id ? { ...task,...editData } : val;
    });

    console.log(editData);
    
    setTasks(temp);
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
            <h2 className="mb-1">Task title :</h2>
            <input
              name="title"
              value={editData.title}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="bg-white w-full text-black text-2xl px-2 py-1 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            />
            <h2 className="mb-1">Task description :</h2>
            <textarea
              name="title"
              value={editData.details}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setEditData({ ...editData, details: e.target.value })
              }
              className="bg-white w-full text-black px-2 py-1 rounded-xl h-30 border resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            ></textarea>
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
