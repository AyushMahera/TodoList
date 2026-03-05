import { useContext } from "react";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/features/todoSlice";

const TaskForm = ({ setShowModal }) => {
  const tasks = useSelector(state => state.todo.tasks);
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    details: "",
  };

  const validationField = {
    title: { required: true },
    details: { required: true },
  };

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

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialState);
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleForm(e) {
    const updateForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(updateForm);
    const fieldError = validate(updateForm)[e.target.name];
    if (fieldError) {
      setError({ ...error, [e.target.name]: fieldError });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validate(formData);
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }
    toast.success("Task added successfully!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    setError("");
    dispatch(createTask({
      id: Date.now(),
      userId: loggedUser,
      title: formData.title,
      details: formData.details,
      completed: false,
    }));
    setFormData(initialState);
    setShowModal(false);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 text-white w-[420px] rounded-2xl p-7 flex flex-col gap-6 shadow-2xl shadow-black/60">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">New Entry</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Create Task</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800 -mx-7" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        {/* Title */}
        <div className="w-full">
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5" htmlFor="title">
            Title <span className="text-red-500 normal-case tracking-normal">*</span>
          </label>
          <input
            onChange={handleForm}
            value={formData.title}
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Review project proposal"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
          {error.title && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠</span> {error.title}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="w-full">
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5" htmlFor="details">
            Details <span className="text-red-500 normal-case tracking-normal">*</span>
          </label>
          <textarea
            onChange={handleForm}
            value={formData.details}
            name="details"
            placeholder="Describe what needs to be done..."
            className="w-full px-4 py-2.5 h-32 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
          />
          {error.details && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠</span> {error.details}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="flex-1 py-2.5 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-colors duration-200 cursor-pointer shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;