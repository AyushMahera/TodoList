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
    setError("");
    setUsers([
      ...users,
      {
        id: Date.now(),
        userName: formData.userName,
        email : formData.email,
        password: formData.password,
      },
    ]);
    setFormData({
      userName: "",
      password: "",
    });
    navigate("/login");
  }

  return (
    <div className="h-[91vh] w-full flex justify-center items-center">
      <div className="bg-gray-400 text-white w-100 rounded-xl p-4 flex flex-col items-center">
        <h2 className="text-3xl font-medium mb-5">Register User</h2>
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

          <div className="w-full mb-1">
            <label className="text-black" htmlFor="email">
              E-mail
            </label>
            <input
              onChange={handleForm}
              value={formData.email}
              type="text"
              id="email"
              name="email"
              placeholder="example@demo.com"
              className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <div className="w-full mb-1">
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

          <div className="w-full mb-3">
            <label htmlFor="cpass" className="text-black">
              Confirm Password
            </label>
            <div className="relative w-90">
              <input
                onChange={handleForm}
                type={showcPass ? "text" : "password"}
                value={formData.cpass}
                name="cpass"
                id="cpass"
                placeholder="Enter password"
                className="border p-2 w-full bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
              />
              <button
                type="button"
                onMouseDown={() => setShowcPass(!showcPass)}
                onMouseUp={() => setShowcPass(!showcPass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 pb-2 text-black cursor-pointer focus:outline-none"
              >
                {showcPass ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
            </div>
            {error.cpass && (
              <p className="text-red-500 text-sm">{error.cpass}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 p-2 w-full rounded-xl hover:bg-blue-400 transition-colors duration-200 cursor-pointer mb-2"
          >
            Register
          </button>
        </form>

        <div className="flex gap-1">
          <p>Already have an account ? </p>
          <NavLink
            to="/login"
            className="font-medium text-blue-300 underline hover:text-white transition-colors duration-200"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
