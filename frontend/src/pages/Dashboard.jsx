import "./Dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user)
  const overviewItems = ["Next Appointment", "Loyalty Points", "Total Appointments"];
  return (
    <div className="dashboard_main_holder flex_column font_1">
      <div className="dashboard_greeting_holder flex_row flex">
        <div className="dashboard_greeting flex_row font_size color_white">
          Hello, Ben Collins
        </div>
      </div>
      <div className="dashboard_info_holder flex_column">
        <div className="dashboard_info_overview_holder flex_column">
          <div className="dashboard_info_overview_heading_holder color_green flex_column font_size_s">
            Overview
          </div>
          <div className="dashboard_info_tile_holder flex_row">
            {overviewItems.map((overviewItem, index) => (
              <div key={index} className="dashboard_info_tile flex_column color_green font_size_s">
                <div className="dashboard_info_tile_heading flex_column" key={index}>{overviewItem}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;