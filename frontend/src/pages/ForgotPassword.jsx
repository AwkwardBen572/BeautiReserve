import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import ErrorModal from "./ErrorModal";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const [form, setForm] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const forgotPassword = async () => {
        var email = form.email
        var sendLink = await fetch("http://localhost:8080/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (sendLink && sendLink.status === 200) {
            setError("Reset link has been sent to your email");
            setShowError(true);
        } else {
            setError("Something went wrong.");
            setShowError(true);
        }
    };

    const handleErrorClose = () => {
        setShowError(false);
        navigate("/");
    };

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
                <input className="input" type="text" placeholder="Email" value={form.email} name="email" onChange={handleChange}></input>
            </div>
            <div className="form_button_holder flex_column flex_all_center"><div className="form_button button flex_column flex_all_center color_white" onClick={() => forgotPassword()}>Send Reset Link</div></div>
            <u className="color_green" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Back to login</u>
            <ErrorModal show={showError} message={error} onClose={() => handleErrorClose()} />
        </div>
    );
};

export default ForgotPassword;
