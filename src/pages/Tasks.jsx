import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Slide, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutGrid, List } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) return JSON.parse(tasks);
    return [];
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [isList, setIsList] = useState(false);

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleToggle(task) {
    let temp = tasks.map((val) => {
      return task.id === val.id ? { ...val, completed: !val.completed } : val;
    });
    console.log(temp);
    
    setTasks(temp);
    console.log(tasks);
  }

  function onDelete(task) {
    let temp = tasks.filter((val) => {
      return task.id !== val.id;
    });
    setTasks(temp);
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

  return (
    <div id="tasklist" className="p-4 h-[91vh] overflow-auto w-full">
      {tasks.filter((val) => val.userId === loggedUser).length > 0 ? (
        <div className="flex justify-center gap-10 mb-10">
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
      ) : (
        <h1 className="text-3xl font-medium text-center">No task found!</h1>
      )}

      <div
        className={`flex gap-5 flex-wrap w-full   ${isList ? "flex-col items-center" : "items-start"} transition-all duration-300 ease-in-out`}
      >
        {tasks.map((task, idx) => {
          return task.userId === loggedUser ? (
            <div key={idx}>
              <TaskItem
                task={task}
                handleToggle={handleToggle}
                onDelete={onDelete}
                tasks={tasks}
                setTasks={setTasks}  
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                isList={isList}
              />
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
