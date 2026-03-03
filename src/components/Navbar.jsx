import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddTaskModal from "./AddTaskModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-cyan-900 flex justify-between items-center px-20 py-3 min-h-[8vh]">
      <div>
        <h2
          onClick={() => navigate("/")}
          className="bg-white text-black rounded-2xl px-3 py-2 hover:bg-amber-200 transition-colors duration-200 cursor-pointer"
        >
          Todos
        </h2>
      </div>
      <div className="flex gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `text-amber-400 font-medium text-xl`
              : `text-white text-xl`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? `text-amber-400 font-medium text-xl`
              : `text-white text-xl`
          }
        >
          Tasks
        </NavLink>

        <button
          onClick={() => setShowModal(true)}
          className="text-xl bg-white text-black px-3 py-2 rounded-2xl hover:bg-amber-200 transition-colors duration-200 cursor-pointer"
        >
          Create New Task
        </button>

        <button
          onClick={logout}
          className="text-xl bg-white text-black px-3 py-2 rounded-2xl hover:bg-amber-200 transition-colors duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
      {showModal && <AddTaskModal setShowModal={setShowModal}/>}
    </div>
  );
};

export default Navbar;
