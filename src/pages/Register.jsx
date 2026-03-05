import { useContext } from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeClosed } from "lucide-react";

const Register = () => {
  const [users, setUsers] = useState(() => {
    const user = localStorage.getItem("users");
    if (user) return JSON.parse(user);
    return [];
  });

  const initialState = {
    userName: "",
    email: "",
    password: "",
    cpass: "",
  };

  const validateField = {
    userName: {
      required: true,
      pattern: /^[A-Za-z][A-Za-z0-9_]{2,19}$/,
      message:
        "Username must start with a letter. Use only 3–20 letters, numbers, or _",
    },
    email: {
      required: true,
      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: "Enter a valid email address",
    },
    password: {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message: "Password must have 8+ chars with upper, lower & number",
    },
    cpass: {
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

      if (rules.pattern && value && !rules.pattern.test(value)) {
        newError[field] = rules.message;
      }

      if(users.some(val => val.userName === data.userName)){
        newError.userName = "Username already taken"
      }

      if(users.some(val => val.email === data.email)){
        newError.email = "User already exist with same email"
      }

      if (data.cpass !== data.password) {
        newError.cpass = "password mismatch";
      }
      
    });

    return newError;
  }

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [showPass, setShowPass] = useState(false);
  const [showcPass, setShowcPass] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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
    if(Object.keys(validateErrors).length > 0){
      setError(validateErrors);
      return
    }

    toast.success("User registered successfully!", {
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
    setError(initialState);
    setUsers([
      ...users,
      {
        id: Date.now(),
        userName: formData.userName,
        email : formData.email,
        password: formData.password,
      },
    ]);
    setFormData(initialState);
    navigate("/login");
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-950">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-gray-900 border border-gray-800 text-white w-full max-w-md rounded-2xl p-8 flex flex-col items-center shadow-2xl shadow-black/60">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Create an account</h2>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">

          {/* Username */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5" htmlFor="userName">
              Username <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <input
              onChange={handleForm}
              value={formData.userName}
              type="text"
              id="userName"
              name="userName"
              placeholder="e.g. john_doe"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {error.userName && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {error.userName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5" htmlFor="email">
              E-mail <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <input
              onChange={handleForm}
              value={formData.email}
              type="text"
              id="email"
              name="email"
              placeholder="example@demo.com"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {error.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full">
            <label htmlFor="password" className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
              Password <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleForm}
                type={showPass ? "text" : "password"}
                value={formData.password}
                name="password"
                id="password"
                placeholder="Min. 8 characters"
                className="w-full px-4 py-2.5 pr-11 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onMouseDown={() => setShowPass(!showPass)}
                onMouseUp={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-300 transition-colors duration-150 focus:outline-none"
              >
                {showPass ? <Eye size={16} /> : <EyeClosed size={16} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {error.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-full">
            <label htmlFor="cpass" className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
              Confirm Password <span className="text-red-500 normal-case tracking-normal">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleForm}
                type={showcPass ? "text" : "password"}
                value={formData.cpass}
                name="cpass"
                id="cpass"
                placeholder="Re-enter password"
                className="w-full px-4 py-2.5 pr-11 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onMouseDown={() => setShowcPass(!showcPass)}
                onMouseUp={() => setShowcPass(!showcPass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-300 transition-colors duration-150 focus:outline-none"
              >
                {showcPass ? <Eye size={16} /> : <EyeClosed size={16} />}
              </button>
            </div>
            {error.cpass && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {error.cpass}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer tracking-wide shadow-lg shadow-blue-900/30"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-600 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-400 font-medium hover:text-blue-300 underline underline-offset-2 transition-colors duration-200"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;