import { useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const initialState = { userName: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const validateField = {
    userName: { required: true },
    password: { required: true },
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
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  function handleForm(e) {
    const updateForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(updateForm);
    const fieldError = validate(updateForm)[e.target.name];
    if (fieldError) {
      setError({ ...error, [e.target.name]: fieldError });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validate(formData);
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }

    if (users.find((val) => val.userName === formData.userName && val.password === formData.password)) {
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

      const [loggedUser] = users.filter((val) => val.userName === formData.userName);
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser.id));
      login();
      setFormData({ userName: "", password: "" });
      setError("");
      return;
    } else {
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
      setFormData(initialState);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-zinc-950">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-zinc-900 border border-zinc-800 text-white w-full max-w-md rounded-2xl p-8 flex flex-col items-center shadow-2xl shadow-black/60">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 mb-4">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome back</h2>
          <p className="text-zinc-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">

          {/* Username */}
          <div className="w-full">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5" htmlFor="userName">
              Username <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <input
              onChange={handleForm}
              value={formData.userName}
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {error.userName && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {error.userName}</p>
            )}
          </div>

          {/* Password */}
          <div className="w-full">
            <label htmlFor="password" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">
              Password <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleForm}
                type={showPass ? "text" : "password"}
                value={formData.password}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-11 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onMouseDown={() => setShowPass(!showPass)}
                onMouseUp={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 hover:text-zinc-300 transition-colors duration-150 focus:outline-none"
              >
                {showPass ? <Eye size={16} /> : <EyeClosed size={16} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {error.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer tracking-wide shadow-lg shadow-indigo-950/40"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <p className="text-sm text-zinc-500">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-indigo-400 font-medium hover:text-indigo-300 underline underline-offset-2 transition-colors duration-200"
          >
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;