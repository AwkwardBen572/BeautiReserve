import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import "./resetPassword.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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

const ResetPassword = () => {
  const query = useQuery();
  const token = query.get("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "" });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];
    if (form.password.length < 8) errors.push("Password must be at least 8 characters.");
    return errors;
  };

  const handleResetPassword = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join("\n"));
      setShowError(true);
      return;
    }

    const newPassword = form.password;
    const res = await fetch("http://localhost:8080/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });

    if (res.ok) {
      setError("Password has been reset successfully.");
      setIsSuccess(true);
      setShowError(true);
    } else {
      const data = await res.json();
      if (data.message === "Token expired") {
        setError("Your reset link has expired. Please request a new password reset email.");
        setTokenExpired(true);
      } else {
        setError(data.message || "Error resetting password.");
      }
      setShowError(true);
    }
  };

  const handleErrorClose = () => {
    setShowError(false);

    if (isSuccess) {
      navigate("/", { replace: true });
    } else if (tokenExpired) {
      navigate("/forgot-password", { replace: true });
    }
  };

  return (
    <div className="reset_password_holder flex_column flex_all_center font_1">
      <div className="reset_password_form_holder flex_column flex_all_center">
        <div className="reset_password_heading color_green font_size">Reset Password</div>
        <div className="reset_password_explain color_green">Insert your new password.</div>
      </div>

      <div className="reset_input_holder">
        <input
          className="input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <ShowPasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
      </div>
      <br></br>
      <br></br>
      <div className="form_button_holder flex_column flex_all_center">
        <div
          className="form_button button flex_column flex_all_center color_white"
          onClick={handleResetPassword}
        >
          Reset password
        </div>
      </div>

      <ErrorModal show={showError} message={error} onClose={handleErrorClose} />
    </div>
  );
};

export default ResetPassword;