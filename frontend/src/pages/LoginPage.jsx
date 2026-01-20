import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import "./LoginPage.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const InputField = ({ label, name, type, value, onChange }) => (
  <div className="login_input_holder">
    <input
      className="input"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
    />
  </div>
);

const ShowPasswordToggle = ({ showPassword, setShowPassword }) => (
  <div className="show_password_holder flex_row flex_all_center color_green">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
    />
    &nbsp;<div>Show Password</div>
  </div>
);

const LoginPage = () => {
  const { user, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [userType, setUserType] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePhone = (number) => {
    const cleaned = number.replace(/[\s-()]/g, "");
    const saPhoneRegex = /^0\d{9}$/;
    return saPhoneRegex.test(cleaned);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const errors = [];
    if (!form.fullName.trim()) errors.push("Please insert your name & surname.");
    if (!form.phoneNumber.trim() || form.phoneNumber.length < 10 || !validatePhone(form.phoneNumber))
      errors.push("Please insert a valid phone number.");
    if (!validateEmail(form.email)) errors.push("Please insert a valid email.");
    if (form.password.length < 8) errors.push("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) errors.push("Passwords do not match.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register") {
      const errors = validateForm();
      if (errors.length > 0) {
        setError(errors.join("\n"));
        setShowError(true);
        return;
      }
      form.role = userType;
      console.log(form)
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setError("User registered successfully.");
        setMode("login");
      } else {
        const data = await res.json();
        setError(data.message);
        setShowError(true);
      }
    } else {
      const { email, password } = form;
      const loginMethod = await login(email, password);
      if(loginMethod && loginMethod === "invalid_credentials") {
        setError("Invalid Credentials");
        setShowError(true);
      }
    }
  };

  return (
    <div className="login_page_holder flex_row font_1">
      <div className="login_page_bg_holder"></div>

      <div className="login_form_holder flex_column flex_all_center">
        <div className="login_brandname_holder flex_column flex_all_center">
          <div className="logo_holder"></div>
          <div className="slogan_holder color_green">
            <i>Reserve your beauty, effortlessly.</i>
          </div>
        </div>

        <div className="login_register_option_holder flex_row flex_all_center">
          {["login", "register"].map((option) => (
            <div
              key={option}
              className={`login_option flex_row flex_all_center ${mode === option ? "login_option_selected" : "login_option"
                }`}
              onClick={() => setMode(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </div>
          ))}
        </div>
        {mode === "register" && (
          <div className="login_register_option_holder flex_row flex_all_center">
            {(
              ["client", "technician"].map((userTypeOption) => (
                <div
                  key={userTypeOption}
                  className={`login_option flex_row flex_all_center ${userType === userTypeOption ? "login_option_selected" : "login_option"
                    }`}
                  onClick={() => setUserType(userTypeOption)}
                >
                  {userTypeOption.charAt(0).toUpperCase() + userTypeOption.slice(1)}
                </div>
              ))
            )}

          </div>
        )}


        <div className="form_holder">
          {mode === "login" && (
            <div className="flex_column flex_all_center">
              <InputField label="Email" name="email" type="text" value={form.email} onChange={handleChange} />
              &nbsp;
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
              />
              <ShowPasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
              <div className="form_button_holder flex_column flex_all_center">
                <div className="form_button button flex_column flex_all_center color_white" onClick={handleSubmit}>
                  Login
                </div>
              </div>
              <div className="forgot_password_holder flex_column flex_all_center color_green">
                <u style={{ cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>
                  Forgot Password
                </u>
              </div>
            </div>
          )}

          {mode === "register" && (
            <div className="flex_column flex_all_center">
              <InputField label="Name & Surname" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
              &nbsp;
              <InputField label="Phone Number" name="phoneNumber" type="text" value={form.phoneNumber} onChange={handleChange} />
              &nbsp;
              <InputField label="Email" name="email" type="text" value={form.email} onChange={handleChange} />
              &nbsp;
              <InputField label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} />
              &nbsp;
              <InputField label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} />
              &nbsp;
              <ShowPasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
              <div className="form_button_holder flex_column flex_all_center">
                <div className="form_button button flex_column flex_all_center color_white" onClick={handleSubmit}>
                  Register
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ErrorModal show={showError} message={error} onClose={() => setShowError(false)} />
    </div>
  );
};

export default LoginPage;