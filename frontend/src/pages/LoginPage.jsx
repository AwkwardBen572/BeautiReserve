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

    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join("\n"));
      setShowError(true);
      return;
    }

    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const text = await res.text();
    setError(text);
  };

  const validateForm = () => {
    let errors = [];
    if (!form.fullName.trim()) errors.push("Please insert your name & surname.");
    if (
      !form.phoneNumber.trim() ||
      form.phoneNumber.length < 10 ||
      !validatePhone(form.phoneNumber)
    ) errors.push("Please insert a valid phone number.");
    console.log(form.password)
    console.log(form.confirmPassword)
    if (!validateEmail(form.email)) errors.push("Please insert a valid email.");
    if (form.password.length < 8) errors.push("Password must be at least 6 characters.");
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
          <div
            className={`login_option flex_row flex_all_center ${
              mode === "login" ? "login_option_selected" : "login_option"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </div>
          <div
            className={`login_option flex_row flex_all_center ${
              mode === "register" ? "login_option_selected" : "login_option"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </div>
        </div>

        <div className="form_holder">
          {mode === "login" && (
            <div className="flex_column flex_all_center">
              <div className="login_input_holder">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              &emsp;
              <div className="login_input_holder">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="show_password_holder flex_row flex_all_center color_green">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                &nbsp;<div className="">Show Password</div>
              </div>
              <div className="form_button_holder flex_column flex_all_center">
                <div className="form_button button flex_column flex_all_center color_white">
                  Login
                </div>
              </div>
              <div className="forgot_password_holder flex_column flex_all_center color_green">
                <u
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </u>
              </div>
            </div>
          )}

          {mode === "register" && (
            <div className="flex_column flex_all_center">
              <InputField
                label="Name & Surname"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
              />
              &emsp;
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              &emsp;
              <InputField
                label="Email"
                name="email"
                type="text"
                value={form.email}
                onChange={handleChange}
              />
              &emsp;
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
              />
              &emsp;
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <div className="show_password_holder flex_row flex_all_center color_green">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                &nbsp;<div className="">Show Password</div>
              </div>
              <div
                className="form_button_holder flex_column flex_all_center"
                onClick={handleSubmit}
              >
                <div className="form_button button flex_column flex_all_center color_white">
                  Register
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ErrorModal
        show={showError}
        message={error}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default LoginPage;