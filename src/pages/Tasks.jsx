import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Slide, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutGrid, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTask,
  deleteTask,
  filterTasks,
  searchTasks,
} from "../redux/features/todoSlice";
import { searchFilterTodo } from "../redux/selector";
import { useSearchParams } from "react-router-dom";

const Tasks = () => {
  const { loggedUser } = useContext(AuthContext);
  const allTasks = useSelector(searchFilterTodo);
  const tasks = allTasks.filter((task) => task.userId === loggedUser);
  const dispatch = useDispatch();

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [isList, setIsList] = useState(false);

  const [searchParam, setSearchParam] = useSearchParams();
  const [filter, setfilter] = useState(searchParam.get("filter") || "");
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    dispatch(filterTasks(filter));
    dispatch(searchTasks(search))
  },[])


  function handleToggle(task) {
    dispatch(completeTask(task.id));
  }

  function onDelete(task) {
    console.log(task.id);

    dispatch(deleteTask(task.id));
    toast.error("Task deleted!", {
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
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterTasks(filter));
      dispatch(searchTasks(search));
    }, 1000);

    return () => clearTimeout(timer)
  },[search, filter, dispatch]);

  return (
    <div id="tasklist" className="p-4 h-[91vh] overflow-auto w-full">
      <div className="w-full flex justify-between mb-10">
        <div className="flex gap-10">
          <button
            onClick={() => setIsList(false)}
            className={`flex gap-1 items-center hover:text-gray-500 hover:cursor-pointer ${!isList ? "text-white" : "text-gray-400"}`}
          >
            <LayoutGrid size={18} />
            Cardview
          </button>
          <button
            onClick={() => setIsList(true)}
            className={`flex gap-1 items-center hover:text-gray-500 hover:cursor-pointer ${isList ? "text-white" : "text-gray-400"}`}
          >
            <List size={18} />
            Listview
          </button>
        </div>
        <div>
          <input
            type="search"
            name="search"
            value={search}
            id="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="border bg-white text-black px-2 rounded mr-4"
            placeholder="Search Tasks"
          />
          <label htmlFor="filter">Filter : </label>
          <select
            name="filter"
            value={filter}
            id="filter"
            onChange={(e) => {
              setfilter(e.target.value);
              setSearchParam({filter : `${e.target.value}`})
            }}
            className="border rounded px-2 bg-white text-black"
          >
            <option value="" >
              All Tasks
            </option>
            <option value="completed">Completed Tasks</option>
            <option value="pending">Pending Tasks</option>
          </select>
        </div>
      </div>

      {tasks.length === 0 && (
        <h1 className="text-3xl font-medium text-center">No task found!</h1>
      )}

      <div
        className={`flex gap-5 flex-wrap w-full ${isList ? "flex-col items-center" : "items-start"} transition-all duration-300 ease-in-out`}
      >
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <TaskItem
                task={task}
                handleToggle={handleToggle}
                onDelete={onDelete}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                isList={isList}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
