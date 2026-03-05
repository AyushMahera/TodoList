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

  const initialState = { title: "", details: "" };
  const [editData, setEditData] = useState(initialState);
  const [error, setError] = useState(initialState);

  const validationField = {
    title: { required: true },
    details: { required: true },
  };

  function handleForm(e) {
    const updateForm = { ...editData, [e.target.name]: e.target.value };
    setEditData(updateForm);
    const fieldError = validate(updateForm)[e.target.name];
    if (fieldError) {
      setError({ ...error, [e.target.name]: fieldError });
    } else {
      setError({ ...error, [e.target.name]: "" });
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
    setEditData({ title: task.title, details: task.details });
    setEditShowModal(false);
    setError(initialState);
  }

  return (
    <div
      className={`group relative flex flex-col justify-between gap-3 rounded-2xl p-4 border transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl
        ${task.completed
          ? "bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-950/50"
          : "bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:shadow-zinc-950/80"
        }
        ${isList ? "w-[70vw] flex-row items-center h-auto" : "h-52 w-80"}`}
    >
      {/* Completion badge */}
      {task.completed && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400" />
      )}

      {/* Content */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <h2 className={`text-base font-semibold truncate ${task.completed ? "text-emerald-200 line-through decoration-emerald-500/50" : "text-white"}`}>
          {task.title}
        </h2>
        {!isList && (
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-light">
            {task.details}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className={`flex gap-2 ${isList ? "flex-shrink-0" : "mt-auto"}`}>
        <button
          onClick={() => handleToggle(task)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200
            ${task.completed
              ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"
              : "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30"
            }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingTaskId(task.id);
            setEditData({ title: task.title, details: task.details });
            setEditShowModal(true);
          }}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 bg-amber-500/15 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/30"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30"
        >
          Delete
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500 hover:text-white border border-indigo-500/30"
        >
          View
        </button>
      </div>

      {/* View Modal */}
      <TaskModal showModal={showModal} setShowModal={setShowModal} isCompleted={task.completed}>
        {!isEditable && (
          <>
            <div>
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">Task Detail</p>
              <h2 className="text-xl font-bold text-white mb-3 leading-snug">{task.title}</h2>
              <div className="h-px bg-zinc-800 mb-4" />
              <p className="text-zinc-400 text-sm leading-relaxed">{task.details}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm font-semibold px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </>
        )}
      </TaskModal>

      {/* Edit Modal */}
      <EditModal showModal={editShowModal} onCancel={onCancel} isCompleted={task.completed}>
        <>
          <div>
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">Editing</p>
            <h1 className="text-xl font-bold text-white tracking-tight">Edit Task</h1>
          </div>

          <div className="h-px bg-zinc-800" />

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5" htmlFor="title">
                Title <span className="text-red-500 normal-case tracking-normal">*</span>
              </label>
              <input
                name="title"
                id="title"
                value={editData.title}
                onClick={(e) => e.stopPropagation()}
                onChange={handleForm}
                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              {error.title && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span> {error.title}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5" htmlFor="details">
                Details <span className="text-red-500 normal-case tracking-normal">*</span>
              </label>
              <textarea
                name="details"
                value={editData.details}
                onClick={(e) => e.stopPropagation()}
                onChange={handleForm}
                className="w-full px-4 py-2.5 h-32 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              {error.details && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {error.details}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onCancel()}
              className="flex-1 py-2.5 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={(e) => { onEdit(task); e.stopPropagation(); }}
              type="button"
              className="flex-1 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-colors duration-200 cursor-pointer shadow-lg shadow-indigo-950/50"
            >
              Save Changes
            </button>
          </div>
        </>
      </EditModal>
    </div>
  );
};

export default TaskItem;