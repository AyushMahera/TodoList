import { useContext } from "react";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TaskForm = () => {
  const [tasks, setTasks] = useState(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) return JSON.parse(tasks);
    return [];
  });

  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  const [error, setError] = useState("");

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!(formData.title.trim() && formData.details.trim())) {
      setError("All fields required");
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
    setTasks([
      {
        id: Date.now(),
        userId: loggedUser,
        title: formData.title,
        details: formData.details,
        completed: false,
      },
      ...tasks,
    ]);
    setFormData({
      title: "",
      details: "",
    });
  }

  return (
    <div className="bg-gray-400 text-white w-100 rounded-xl p-4 flex flex-col items-center gap-5">
      <h2 className="text-3xl font-medium">Task Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleForm}
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter task title"
          className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl mb-3"
        />
        <textarea
          onChange={handleForm}
          type="text"
          value={formData.details}
          name="details"
          placeholder="Enter task details"
          className="border p-2 w-full h-35 bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl mb-3 resize-none"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded-xl hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
        >
          Add task
        </button>
      </form>
      <div className="w-full flex items-center justify-end mb-2">
        <Link to='/tasks' className="flex items-center gap-1 hover:text-blue-300 transition-colors">View Tasks <ArrowRight size={22} className="pt-1"/></Link>
      </div>
    </div>
  );
};

export default TaskForm;
