import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login_page_holder flex_row font_1">
      <div className="login_page_bg_holder">

      </div>
      <div className="login_form_holder flex_column flex_all_center">
        <div className="login_form flex_column flex_all_center">
          <div className="login_form_header flex_column flex_all_center font_size_l color_green">
            Login
          </div>
          <div className="login_form_details flex_column flex_all_center">
            <div className="input_holder">
              <input className="input font_size_s" type="text" placeholder="Email"></input>
            </div>
            <br></br>
            <div className="input_holder">
              <input className="input font_size_s" type="password" placeholder="Password"></input>
            </div>
            <br></br>
            <div className="show_password_holder flex_row color_green">
              <input className="checkbox" type="checkbox"></input>
              &nbsp;Show Password
            </div>
          </div>
          <div className="login_button_holder flex_column flex_all_center">
            <div className="login_button button flex_column flex_all_center color_white">
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;