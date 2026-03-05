import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddTaskModal from "./AddTaskModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 flex justify-between items-center px-10 py-0 min-h-[64px] sticky top-0 z-50">
      
      {/* Logo */}
      <div>
        <h2
          onClick={() => navigate("/")}
          className="text-white font-bold text-lg tracking-tight cursor-pointer flex items-center gap-2 group"
        >
          <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-black group-hover:bg-indigo-400 transition-colors duration-200">
            T
          </span>
          <span className="group-hover:text-indigo-300 transition-colors duration-200">Todos</span>
        </h2>
      </div>

      {/* Nav Links */}
      <div className="flex gap-1 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800"
              : "text-zinc-400 text-sm font-medium px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "text-white text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800"
              : "text-zinc-400 text-sm font-medium px-4 py-2 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          }
        >
          Tasks
        </NavLink>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-700 mx-2" />

        <button
          onClick={() => setShowModal(true)}
          className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>

        <button
          onClick={logout}
          className="text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ml-1"
        >
          Logout
        </button>
      </div>

      {showModal && <AddTaskModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Navbar;