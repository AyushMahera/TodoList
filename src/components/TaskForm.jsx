import { useContext } from "react";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/features/todoSlice";

const TaskForm = ({setShowModal}) => {

  const tasks = useSelector(state => state.todo.tasks);
  const dispatch = useDispatch();
  

  

  const initialState = {
    title: "",
    details: "",
  };

  const validationField = {
    title: {
      required: true,
    },
    details: {
      required: true,
    },
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
    const updateForm = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updateForm);

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

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validate(formData);
    if(Object.keys(validateErrors).length > 0){
      setError(validateErrors);
      return
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
      }))
    setFormData(initialState);
    setShowModal(false);
  }

  return (
    <div className="bg-gray-400 text-white w-100 rounded-xl p-4 flex flex-col items-center gap-5">
      <h2 className="text-3xl font-medium">Task Form</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full mb-1">
          <label className="text-black" htmlFor="title">
            Title <span className="text-sm text-red-500">*</span>
          </label>
          <input
            onChange={handleForm}
            value={formData.title}
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
          />
          {error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
        </div>

        <div className="w-full mb-3">
          <label className="text-black" htmlFor="details">
            Details <span className="text-sm text-red-500">*</span>
          </label>
          <textarea
            onChange={handleForm}
            type="text"
            value={formData.details}
            name="details"
            placeholder="Enter task details"
            className="border p-2 w-full h-35 bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl resize-none"
          />
          {error.details && <p className="text-red-500 text-sm">{error.details}</p>}
        </div>

        <div className="w-full flex gap-2">
          <button
          type="button"
          onClick={() => setShowModal(false)}
          className="bg-red-500 w-full p-2 rounded-xl hover:bg-red-400 transition-colors duration-200 cursor-pointer"
        >
          Cancel
        </button>
          <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded-xl hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
        >
          Add task
        </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
