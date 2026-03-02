import { useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const initialState = {
    userName: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const validateField = {
    userName: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  function validate(data) {
    let newError = {};

    Object.keys(validateField).forEach((field) => {
      const rules = validateField[field];
      const value = data[field];

      if (rules.required && !value.trim()) {
        newError[field] = "This field is required";
        return;
      }
    });

    return newError;
  }

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
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
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
      toast.error("Invalid Username or Password", {
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
      setFormData(initialState)
    }
  }

  return (
    <div className="h-[91vh] w-full flex justify-center items-center">
      <div className="bg-gray-400 text-white w-100 rounded-xl p-4 flex flex-col items-center">
        <h2 className="text-3xl font-medium mb-5">Login</h2>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="w-full mb-1">
            <label className="text-black" htmlFor="userName">
              Username
            </label>
            <input
              onChange={handleForm}
              value={formData.userName}
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter new username"
              className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
            />
            {error.userName && (
              <p className="text-red-500 text-sm">{error.userName}</p>
            )}
          </div>

          <div className="w-full mb-3">
            <label htmlFor="password" className="text-black">
              Password
            </label>
            <div className="relative w-90">
              <input
                onChange={handleForm}
                type={showPass ? "text" : "password"}
                value={formData.password}
                name="password"
                id="password"
                placeholder="Enter password"
                className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
              />
              <button
                type="button"
                onMouseDown={() => setShowPass(!showPass)}
                onMouseUp={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 pb-2 text-black cursor-pointer focus:outline-none"
              >
                {showPass ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>

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
