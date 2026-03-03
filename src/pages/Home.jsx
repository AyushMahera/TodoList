import React, { useContext, useMemo } from "react";
import TaskForm from "../components/TaskForm";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { loggedUser } = useContext(AuthContext);
  const tasks = useSelector(state => state.todo.tasks).filter((task) => task.userId === loggedUser);
  const total = useMemo(() => {
    return tasks.length
  }, [tasks]);

  const completed = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  const pending = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  const navigate = useNavigate();

  return (
    <div className="h-[91vh] flex justify-evenly items-center">
        <div onClick={() => navigate('/tasks')} className="h-80 w-80 bg-gray-900 flex flex-col items-center justify-center gap-5 rounded-2xl hover:size-103 hover:bg-gray-600 transition-all duration-300 cursor-pointer ">
          <h2 className="text-4xl">Total Tasks</h2>
          <h3 className="text-4xl">{total}</h3>
        </div>
        <div onClick={() => navigate('/tasks?filter=completed')} className="h-80 w-80 bg-green-900 flex flex-col items-center justify-center gap-5 rounded-2xl hover:size-103 hover:bg-green-600 transition-all duration-300 cursor-pointer ">
          <h2 className="text-4xl">Completed Tasks</h2>
          <h3 className="text-4xl">{completed}</h3>
        </div>
        <div onClick={() => navigate('/tasks?filter=pending')} className="h-80 w-80 bg-yellow-900 flex flex-col items-center justify-center gap-5 rounded-2xl hover:size-103 hover:bg-yellow-600 transition-all duration-300 cursor-pointer ">
          <h2 className="text-4xl">Pending Tasks</h2>
          <h3 className="text-4xl">{pending}</h3>
        </div>
        
    </div>
  );
};

export default Home;
