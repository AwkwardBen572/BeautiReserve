import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import "./LoginPage.css";

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
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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

      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setMode("login");
      } else {
        setError(
          "There was an error with registering. The user may already exist or details are incorrect."
        );
        setShowError(true);
      }
    } else {
      const { email, password } = form;
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        setError(
          "There was an error logging in. The user may not exist or details are incorrect."
        );
        setShowError(true);
      }
    }
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

  const validatePhone = (number) => {
    const cleaned = number.replace(/[\s-()]/g, "");
    const saPhoneRegex = /^0\d{9}$/;
    return saPhoneRegex.test(cleaned);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
              className={`login_option flex_row flex_all_center ${
                mode === option ? "login_option_selected" : "login_option"
              }`}
              onClick={() => setMode(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </div>
          ))}
        </div>

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