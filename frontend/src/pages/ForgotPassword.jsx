import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="forgot_password_holder flex_column flex_all_center font_1">
            <div className="forgot_password_graphic_holder flex_column flex_all_center">
            </div>
            <div className="forgot_password_form_holder flex_column flex_all_center">
                <div className="forgot_password_heading color_green font_size">
                    Forgot Password
                </div>
                <div className="forgot_password_explain color_green">
                    Enter your email address so that we can send you a link to reset your password.
                </div>
            </div>
            <div className="forgot_input_holder">
                <input className="input" type="text" placeholder="Email"></input>
            </div>
            <div className="form_button_holder flex_column flex_all_center"><div className="form_button button flex_column flex_all_center color_white">Send Reset Link</div></div>
            <u className="color_green" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Back to login</u>
        </div>
    );
};

export default ForgotPassword;
