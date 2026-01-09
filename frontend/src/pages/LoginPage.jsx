import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login_page_holder flex_row font_1">
      <div className="login_page_bg_holder">

      </div>
      <div className="login_form_holder flex_column flex_all_center">
        <div className="login_brandname_holder flex_column flex_all_center">
          <div className="logo_holder">

          </div>
          <div className="slogan_holder color_green">
            <i>Reserve your beauty, effortlessly.</i>
          </div>
        </div>
        <div className="login_register_option_holder flex_row flex_all_center">
          <div
            className={`login_option flex_row flex_all_center ${mode === "login" ? "login_option_selected" : "login_option"
              }`}
            onClick={() => setMode("login")}
          >
            Login
          </div>
          <div
            className={`login_option flex_row flex_all_center ${mode === "register" ? "login_option_selected" : "login_option"
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
                <input className="input" type="text" placeholder="Email"></input>
              </div>
              &emsp;
              <div className="login_input_holder">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
              </div>
              <div className="show_password_holder flex_row flex_all_center color_green">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />&nbsp;<div className="">Show Password</div>
              </div>
              <div className="form_button_holder flex_column flex_all_center"><div className="form_button button flex_column flex_all_center color_white">Login</div></div>
              <div className="forgot_password_holder flex_column flex_all_center color_green">
                <u style={{ cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>Forgot Password</u>
              </div>
            </div>
          )}
          {mode === "register" && (
            <div className="flex_column flex_all_center">
              <div className="login_input_holder">
                <input className="input" type="text" placeholder="Name & Surname"></input>
              </div>
              &emsp;
              <div className="login_input_holder">
                <input className="input" type="number" placeholder="Phone Number"></input>
              </div>
              &emsp;
              <div className="login_input_holder">
                <input className="input" type="number" placeholder="Email"></input>
              </div>
              &emsp;
              <div className="login_input_holder">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
              </div>
              &emsp;
              <div className="login_input_holder">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="show_password_holder flex_row flex_all_center color_green">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />&nbsp;<div className="">Show Password</div>
              </div>
              <div className="form_button_holder flex_column flex_all_center"><div className="form_button button flex_column flex_all_center color_white">Register</div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;