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
    dispatch(searchTasks(search));
  }, []);

  function handleToggle(task) {
    dispatch(completeTask(task.id));
  }

  function onDelete(task) {
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
    return () => clearTimeout(timer);
  }, [search, filter, dispatch]);

  return (
    <div id="tasklist" className="min-h-[calc(100vh-64px)] bg-zinc-950 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">Workspace</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Tasks</h1>
        </div>

        {/* Toolbar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 flex justify-between items-center mb-8">

          {/* View Toggle */}
          <div className="flex gap-1">
            <button
              onClick={() => setIsList(false)}
              className={`flex gap-1.5 items-center text-sm px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                !isList
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <LayoutGrid size={15} />
              Grid
            </button>
            <button
              onClick={() => setIsList(true)}
              className={`flex gap-1.5 items-center text-sm px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                isList
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <List size={15} />
              List
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                name="search"
                value={search}
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-48"
                placeholder="Search tasks..."
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              <select
                name="filter"
                value={filter}
                id="filter"
                onChange={(e) => {
                  setfilter(e.target.value);
                  setSearchParam({ filter: `${e.target.value}` });
                }}
                className="pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-zinc-400 font-semibold text-lg">No tasks found</p>
            <p className="text-zinc-600 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Task Grid / List */}
        <div
          className={`flex gap-4 flex-wrap w-full ${
            isList ? "flex-col items-center" : "items-start"
          } transition-all duration-300 ease-in-out`}
        >
          {tasks.map((task) => (
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
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tasks;