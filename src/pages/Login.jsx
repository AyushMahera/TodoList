import { useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { isAuthenticated, login } = useContext(AuthContext);
  AuthContext;

  const [error, setError] = useState("");

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  function handleForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!(formData.userName.trim() && formData.password.trim())) {
      setError("All fields required");
      return;
    }

    if (
      users.find(
        (val) =>
          val.userName === formData.userName &&
          val.password === formData.password,
      )
    ) {
      toast.success("Login successfully!", {
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

      const [loggedUser] = users.filter((val) => {
        return val.userName === formData.userName;
      });
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser.id));

      login();

      setFormData({
        userName: "",
        password: "",
      });
      setError("");
      return;
    }else{
      setError("Invalid username or password!");
    }

  }

  return (
    <div className="h-[91vh] w-full flex justify-center items-center">
      <div className="bg-gray-400 text-white w-100 rounded-xl p-4 flex flex-col items-center">
        <h2 className="text-3xl font-medium mb-5">Login</h2>
        <form onSubmit={handleSubmit} className="mb-2">
          <input
            onChange={handleForm}
            value={formData.userName}
            type="text"
            name="userName"
            placeholder="Enter username"
            className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl mb-3"
          />
          <div className="relative w-90">
          <input
            onChange={handleForm}
            type={showPass ? "text":"password"}
            value={formData.password}
            name="password"
            placeholder="Enter password"
            className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl mb-3"
          />
          <button type="button" onMouseDown={() => setShowPass(!showPass)} onMouseUp={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 flex items-center px-3 pb-2 text-black cursor-pointer focus:outline-none">
            {showPass ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
          </div>
          {error && <p className="text-red-600 mb-2">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 w-full p-2 rounded-xl hover:bg-blue-400 transition-colors duration-200 cursor-pointer mb-2"
            >
              Login
            </button>
        </form>
      <div className="flex gap-1">
        <p>Don't have an account ? </p>
        <NavLink
              to="/register"
              className="font-medium text-blue-300 underline hover:text-white transition-colors duration-200"
            >
              Register here
            </NavLink>
            </div>
      </div>
    </div>
  );
};

export default Login;
